import cv2
import yt_dlp
from api.core.clip import model, processor, device
import torch
import numpy as np
# utils/visual_search_utils.py
from fastapi import HTTPException
from yt_dlp import YoutubeDL
import tempfile
import os

def get_stream_url(video_id: str) -> str:
    url = f"https://www.youtube.com/watch?v={video_id}"

    # Try: Android client + mp4 preference
    primary_opts = {
        "quiet": True,
        "noplaylist": True,
        "skip_download": True,
        "format": "bv*[ext=mp4]+ba[ext=m4a]/b[ext=mp4]/best",
        "extractor_args": {"youtube": {"player_client": ["android"]}},
    }

    try:
        with YoutubeDL(primary_opts) as ydl:
            info = ydl.extract_info(url, download=False)
            # 1) If yt-dlp gave us a top-level url, use it
            if info.get("url"):
                return info["url"]
            # 2) Otherwise pick a playable format with a direct URL
            fmts = info.get("formats", []) or []
            # Prefer progressive/mp4 with both audio+video
            for f in reversed(fmts):
                if f.get("url") and f.get("vcodec") != "none" and f.get("acodec") != "none":
                    return f["url"]
            # Fallback: any video format with a URL
            for f in reversed(fmts):
                if f.get("url") and f.get("vcodec") != "none":
                    return f["url"]
    except Exception as e:
        # fall through to download fallback
        pass

    # 3) Last resort: download a small progressive mp4 locally and return the path
    # (OpenCV can read local files reliably.)
    try:
        tmp = tempfile.NamedTemporaryFile(delete=False, suffix=".mp4")
        tmp_path = tmp.name
        tmp.close()

        fallback_opts = {
            "quiet": True,
            "noplaylist": True,
            "outtmpl": tmp_path,
            # aim for a progressive mp4 to keep it light
            "format": "mp4[height<=480]/best[ext=mp4]/best",
        }
        with YoutubeDL(fallback_opts) as ydl:
            ydl.download([url])

        if os.path.getsize(tmp_path) == 0:
            raise RuntimeError("Downloaded file is empty")
        return tmp_path  # Pass this to cv2.VideoCapture(...)
    except Exception as e:
        raise HTTPException(
            status_code=502,
            detail=f"Could not obtain a playable stream for this video (YouTube SABR/format restrictions). "
                   f"Try another video or update yt-dlp. Error: {e}"
        )

    
def extract_frames_with_timestamps(stream_url: str, frame_interval: int=30):
    frames_with_timestamps = []
    video = cv2.VideoCapture(stream_url)

    fps = video.get(cv2.CAP_PROP_FPS)
    if fps <= 0:
        fps = 30.0

    count = 0

    while video.isOpened():
        ret, frame = video.read()
        if not ret:
            break
        
        if count % frame_interval == 0:
            frame_rgb = cv2.cvtColor(frame, cv2.COLOR_BGR2RGB)

            # Convert frame index → timestamp
            seconds = (count / fps)
            timestamp = f"{int(seconds // 60)}:{int(seconds % 60):02d}"

            frames_with_timestamps.append({
                "frame": frame_rgb,
                "timestamp": timestamp
            })

        count += 1

    video.release()

    if not frames_with_timestamps:
            raise HTTPException(
                status_code = 400,
                detail = "Unable to extract frames from the video stream."
            )
    return frames_with_timestamps

    
def generate_frame_embeddings(frames, model=model, processor=processor, device=device):
    """
    Generates CLIP embeddings for a list of frames.
    """
    results = []
    with torch.no_grad():
        for item in frames:
            frame = item["frame"]
            timestamp = item["timestamp"]

            inputs = processor(images=frame, return_tensors="pt", padding=True).to(device)

            image_features = model.get_image_features(**inputs)

            normalized_features = image_features / image_features.norm(p=2, dim=-1, keepdim=True)

            results.append({
                "embedding": normalized_features.cpu().numpy(),
                "timestamp": timestamp
            })

    if not results:
            raise HTTPException(
                status_code = 400,
                detail = "Error generating embeddings for extracted frames."
            )

    return results


def get_text_embedding(query, model=model, processor=processor, device=device):
    print('getting embedding for query: ', query)
    with torch.no_grad():
        inputs = processor(text=[query], return_tensors="pt", padding=True).to(device)
        text_features = model.get_text_features(**inputs)
        normalized = text_features / text_features.norm(p=2, dim=-1, keepdim=True)
        
        if normalized is None or normalized.numel() == 0:
            raise HTTPException(
                status_code = 400,
                detail = "Error generating embedding for the provided text query."
            )
        
        return normalized.cpu().numpy()
    
def search_frames(query_embedding, frame_embeddings, top_k=3):
    """
    Search for frames most relevant to a pre-computed text embedding.
    
    Args:
        query_embedding (np.ndarray): Normalized text embedding, shape (1, D)
        frame_embeddings (list): Output from generate_frame_embeddings
        top_k (int): How many results to return
    
    Returns:
        list of dicts: [{"timestamp": "0:15", "score": 0.82}, ...]
    """
    embeddings = np.vstack([item["embedding"] for item in frame_embeddings])
    timestamps = [item["timestamp"] for item in frame_embeddings]

    sims = np.dot(embeddings, query_embedding.T).squeeze()

    top_indices = sims.argsort()[-top_k:][::-1]
    results = [{"timestamp": timestamps[i], "score": float(sims[i])} for i in top_indices]
    
    if not results:
            raise HTTPException(
                status_code = 400,
                detail = "Failed to search frames with the given text embedding."
            )
    
    return results