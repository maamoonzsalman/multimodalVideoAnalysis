from fastapi import FastAPI
from api.routes.transcript_routes import router as transcript_router

app = FastAPI()

app.include_router(transcript_router)

@app.get("/")
def root():
    return {"Hello": "World"}

