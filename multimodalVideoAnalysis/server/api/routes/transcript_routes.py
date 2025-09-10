from fastapi import APIRouter
from api.controllers.transcript_controller import get_video_transcript

router = APIRouter(
    prefix="/transcript",
    tags=['transcript'],
)

@router.get("/")
async def fetch_transcript(url: str):
    transcript = get_video_transcript(url)
    return {"transcript": transcript}