from api.utils.youtube_utils import extract_video_id, extract_video_transcript, build_timestamp_prompt, query_gemini, format_timestamps_to_array

def get_video_timestamps(video_id: str)-> str:
    transcript = extract_video_transcript(video_id)
    prompt = build_timestamp_prompt(transcript)
    timestamps = query_gemini(prompt)
    formatted_timestamps = format_timestamps_to_array(timestamps)
    return formatted_timestamps