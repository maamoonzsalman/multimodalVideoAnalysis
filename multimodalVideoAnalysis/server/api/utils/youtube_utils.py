import re
from fastapi import HTTPException
from youtube_transcript_api import YouTubeTranscriptApi

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
            detail="Invalid Youtube URL. Please provide a link in the format: https://youtube.com/watch?v=VIDEO_ID"
        )
    
    return match.group(1)

def extract_video_transcript(video_id: str) -> str | None:
    '''
    Extract transcript for Youtube video with a given video ID
    
    Arg: video_id(str): The Youtube video ID to extract the transcript from
    '''
    ytt_api = YouTubeTranscriptApi()
    transcript = ytt_api.fetch(video_id).to_raw_data()
    
    return transcript