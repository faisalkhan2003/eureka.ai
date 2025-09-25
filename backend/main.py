from fastapi import FastAPI
from fastapi.middleware.cors import CORSMiddleware
from app.config.settings import settings
from app.controllers.auth_controller import router as auth_router
from app.controllers.ai_controller import router as ai_router
app = FastAPI(title="Auth API (FastAPI + PyMongo)")

# 👇 explicitly allow your React frontend(s)
origins = [
    "http://localhost:5173",  # React Vite dev server
    "http://localhost:3000",  # React CRA dev server (optional)
]

app.add_middleware(
    CORSMiddleware,
    allow_origins=origins,        # 🚀 never use ["*"] with cookies
    allow_credentials=True,       # 🚀 must be True for cookies
    allow_methods=["*"],
    allow_headers=["*"],
)

# Routes
app.include_router(auth_router)
app.include_router(ai_router)

@app.get("/")
async def root():
    return {"status": "ok"}
