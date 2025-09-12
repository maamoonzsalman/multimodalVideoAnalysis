from fastapi import APIRouter
from api.controllers.visual_search_controller import get_visuals


router = APIRouter(
    prefix = "/visual_search",
    tags = ['visual_search']
)

@router.get('/')
async def fetch_visual_content(url: str, inquiry: str):
    res = get_visuals(url, inquiry)
    return {"result": res}
    
