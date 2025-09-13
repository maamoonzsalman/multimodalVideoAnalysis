import re
from fastapi import HTTPException
import json
from youtube_transcript_api import YouTubeTranscriptApi
from api.core.gemini import gemini_model

def extract_video_id(url: str) -> str | None:
    '''
    Extract the youtube video id from a standard Youtube URL
    
    Arg: url(str): The Youtube URL to extract the video ID from
    Returns: str: The 11-character video ID if found, otherwise None
    Raises: HTTPExcepion: If the URL is invalid or if no video ID can be extracted
    '''
    pattern = re.compile(
        r'^(?:https?:\/\/)?(?:www\.)?(?:youtube\.com\/watch\?v=|youtu\.be\/)([a-zA-Z0-9_-]{11})(?:[&?].*)?$'
    )
    match = pattern.match(url.strip())

    if not match:
        raise HTTPException(
            status_code = 400,
            detail = "Invalid Youtube URL. Please provide a link in the format: https://youtube.com/watch?v=VIDEO_ID"
        )
    
    return match.group(1)

def extract_video_transcript(video_id: str) -> str | None:
    '''
    Extract transcript for Youtube video with a given video ID
    
    Arg: video_id(str): The Youtube video ID to extract the transcript from
    Returns: list of dictionaries containing transcript snippets with timestamps
    Raises: HTTPException if transcript can not be retrieved 

    '''
    try:
        ytt_api = YouTubeTranscriptApi()
        raw_transcript = ytt_api.fetch(video_id).to_raw_data()
    except Exception as e:
        raise HTTPException(
            status_code=400,
            detail=f"Unable to retrieve transcript: {str(e)}"
        )

    if not raw_transcript:
        raise HTTPException(
            status_code=400,
            detail="Transcript is empty or unavailable."
        )

    # Transform timestamps into HH:MM:SS
    transcript = [
        {
            "text": item["text"],
            "start": seconds_to_hms(item["start"]),
            "duration": seconds_to_hms(item["duration"])
        }
        for item in raw_transcript
    ]

    return transcript

def seconds_to_hms(seconds: float) -> str:
    """
    Convert float seconds to HH:MM:SS format.
    """
    seconds = int(seconds)
    hours = seconds // 3600
    minutes = (seconds % 3600) // 60
    secs = seconds % 60
    return f"{hours:02}:{minutes:02}:{secs:02}"

def build_timestamp_prompt(transcript: list) -> str:
    return (
        "Here's a transcript with timestamps from a YouTube video:\n\n"
        f"{transcript}\n\n"
        "Your task: segment the ENTIRE video into topics/scenes using the provided timestamps. "
        "Go through the FULL transcript until the very last timestamp — do NOT stop early.\n\n"
        "Return a JSON object where each key is the timestamp (like '0:42') marking the start of a new scene/topic, "
        "and each value is a very short, clean title for that section (1-5 words). "
        "Respond ONLY with valid JSON. No explanation. Ensure the segmentation spans the WHOLE video duration."
    )

def build_chat_prompt(transcript_text: str, inquiry: str):
    return (
        "You are an assistant that answers questions about YouTube videos based on transcripts with timestamps.\n\n"
        "Here is the transcript:\n\n"
        f"{transcript_text}\n\n"
        "Here is the user's question:\n\n"
        f"{inquiry}\n\n"
        "Please return your response in **valid JSON format** as shown below:\n"
        "{\n"
        "  \"response\": \"<your answer here with [timestamp] citations at relevant points>\"\n"
        "}\n"
        "Be concise. Use only timestamps present in the transcript, and insert them at relevant points inside square brackets. If the answer is not in the video, then convey that."
    )

def query_gemini(prompt: str):
    response = gemini_model.generate_content([prompt])
    raw = response.text.strip("```json").strip("```").strip()
    return json.loads(raw)

def format_timestamps_to_array(timestamps: dict) -> list:
    """
    Convert a dictionary of timestamps into an array of objects.
    
    Args:
        timestamps (dict): Example -> {"0:00": "Intro", "0:10": "Details"}
    
    Returns:
        list: Example -> [{"timestamp": "0:00", "title": "Intro"}, {"timestamp": "0:10", "title": "Details"}]
    """
    return [
        {"id": idx + 1, "timestamp": ts, "title": title}
        for idx, (ts, title) in enumerate(timestamps.items())
    ]