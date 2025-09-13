from fastapi import APIRouter
from api.controllers.chat_controller import get_chat_response

router = APIRouter(
    prefix = '/chat',
    tags = ["chat"],
)

@router.get("/")
async def fetch_chat(inquiry: str, video_id: str):
    response = get_chat_response(inquiry, video_id)
    return { "response": response }