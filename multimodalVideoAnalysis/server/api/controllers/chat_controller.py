from api.utils.youtube_utils import build_chat_prompt, query_gemini

def get_chat_response(transcript, inquiry):
    prompt = build_chat_prompt(transcript, inquiry)
    response = query_gemini(prompt)
    return response