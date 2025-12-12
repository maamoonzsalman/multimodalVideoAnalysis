from fastapi import FastAPI
from api.routes.timestamp_routes import router as timestamp_router
from api.routes.chat_routes import router as chat_router
from api.routes.visual_search import router as visual_search_router
from fastapi.middleware.cors import CORSMiddleware

app = FastAPI()

app.add_middleware(
    CORSMiddleware,
    allow_origins = [
        "http://localhost:3000",
        "http://127.0.0.1:3000",
    ],
    allow_credentials = True,
    allow_methods=["*"], 
    allow_headers=["*"],  
)

app.include_router(timestamp_router)
app.include_router(chat_router)
app.include_router(visual_search_router)

@app.get("/")
def root():
    return {"Hello": "World"}
