from api.utils.visual_search_utils import get_stream_url, extract_frames_with_timestamps, generate_frame_embeddings, get_text_embedding, search_frames

def get_visuals(video_id: str, inquiry: str):
    stream_url = get_stream_url(video_id)
    frames = extract_frames_with_timestamps(stream_url)
    frame_embeddings = generate_frame_embeddings(frames)
    inquiry_embedding = get_text_embedding(inquiry)
    res = search_frames(inquiry_embedding, frame_embeddings)


    return res