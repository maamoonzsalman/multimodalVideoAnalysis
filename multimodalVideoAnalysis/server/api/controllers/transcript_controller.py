from api.utils.youtube_utils import extract_video_id, extract_video_transcript

def get_video_transcript(url: str)-> str:
    video_id = extract_video_id(url)
    return video_id