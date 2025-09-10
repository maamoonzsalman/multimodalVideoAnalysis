from fastapi import APIRouter
from api.controllers.timestamp_controller import get_video_timestamps

router = APIRouter(
    prefix="/timestamps",
    tags=['transcript'],
)

@router.get("/")
async def fetch_timestamps(url: str):
    timestamps_transcript = get_video_timestamps(url)
    return {"timestamps": timestamps_transcript[0], "transcript": timestamps_transcript[1]}