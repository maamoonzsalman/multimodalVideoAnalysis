from fastapi import FastAPI
from api.routes.timestamp_routes import router as timestamp_router

app = FastAPI()

app.include_router(timestamp_router)

@app.get("/")
def root():
    return {"Hello": "World"}

