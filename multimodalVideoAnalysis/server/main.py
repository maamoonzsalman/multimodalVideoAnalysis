from fastapi import FastAPI
from api.routes.timestamp_routes import router as timestamp_router
from api.routes.chat_routes import router as chat_router

app = FastAPI()

app.include_router(timestamp_router)
app.include_router(chat_router)

@app.get("/")
def root():
    return {"Hello": "World"}

