from api.utils.youtube_utils import build_chat_prompt, query_gemini, extract_video_transcript

def get_chat_response(inquiry, video_id):
    transcript = extract_video_transcript(video_id)
    prompt = build_chat_prompt(transcript, inquiry)
    response = query_gemini(prompt)
    return response