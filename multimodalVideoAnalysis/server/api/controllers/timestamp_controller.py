from api.utils.youtube_utils import extract_video_id, extract_video_transcript, build_timestamp_prompt, query_gemini

def get_video_timestamps(url: str)-> str:
    video_id = extract_video_id(url)
    transcript = extract_video_transcript(video_id)
    prompt = build_timestamp_prompt(transcript)
    timestamps = query_gemini(prompt)
    return [timestamps, transcript]