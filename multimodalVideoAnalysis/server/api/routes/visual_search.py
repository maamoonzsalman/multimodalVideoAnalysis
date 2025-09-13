from fastapi import APIRouter
from api.controllers.visual_search_controller import get_visuals


router = APIRouter(
    prefix = "/visual_search",
    tags = ['visual_search']
)

@router.get('/')
async def fetch_visual_content(video_id: str, inquiry: str):
    res = get_visuals(video_id, inquiry)
    timestamps = [item["timestamp"] for item in res]
    return { "timestamps": timestamps } 
    
