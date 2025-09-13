from fastapi import APIRouter
from api.controllers.timestamp_controller import get_video_timestamps

router = APIRouter(
    prefix='/timestamps',
    tags=['transcript'],
)

@router.get("/")
async def fetch_timestamps(video_id: str):
    timestamps = get_video_timestamps(video_id)
    return { "timestamps": timestamps }