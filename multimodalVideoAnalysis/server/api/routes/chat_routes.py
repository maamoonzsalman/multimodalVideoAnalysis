from fastapi import APIRouter
from api.controllers.chat_controller import get_chat_response

router = APIRouter(
    prefix = '/chat',
    tags = ["chat"],
)

@router.get("/")
async def fetch_chat(transcript, inquiry: str):
    response = get_chat_response(transcript, inquiry)
    return response