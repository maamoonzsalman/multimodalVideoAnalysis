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
    ytt_api = YouTubeTranscriptApi()
    transcript = ytt_api.fetch(video_id).to_raw_data()

    if not transcript:
        raise HTTPException(
            staus_code = 400,
            details = "Unable to retrieve transcript. Perhaps video ID is incorrect, or there are internal issues with Youtube API"
        )
    
    return transcript

def build_timestamp_prompt(transcript: list) -> str:
    return (
        "Here's a transcript with timestamps from a YouTube video:\n\n"
        f"{transcript}\n\n"
        "Return a JSON object where each key is the timestamp (like '0:42') of a new scene/topic, "
        "and each value is a very short, clean title for that section (1-5 words). Respond only with valid JSON. No explanation."
    )

def query_gemini(prompt: str):
    response = gemini_model.generate_content([prompt])
    raw = response.text.strip("```json").strip("```").strip()
    return json.loads(raw)