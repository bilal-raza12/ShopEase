from fastapi import FastAPI
from fastapi.middleware.cors import CORSMiddleware
from contextlib import asynccontextmanager
from app.config import get_settings
from app.database import init_db, MongoDB
from app.routers.chat import router as chat_router
from app.routers.admin import router as admin_router

settings = get_settings()


@asynccontextmanager
async def lifespan(app: FastAPI):
    # Startup
    print("[STARTUP] Starting ShopEase Chatbot...")

    # Initialize PostgreSQL
    await init_db()
    print("[OK] PostgreSQL initialized")

    # Connect to MongoDB
    MongoDB.connect()
    print("[OK] MongoDB connected")

    yield

    # Shutdown
    MongoDB.close()
    print("[SHUTDOWN] ShopEase Chatbot shutdown complete")


app = FastAPI(
    title="ShopEase Chatbot API",
    description="AI-powered chatbot for ShopEase e-commerce platform",
    version="1.0.0",
    lifespan=lifespan,
)

# CORS configuration
app.add_middleware(
    CORSMiddleware,
    allow_origins=["*"],  # Configure for production
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

# Include routers
app.include_router(chat_router, prefix="/api")
app.include_router(admin_router, prefix="/api")


@app.get("/")
async def root():
    return {
        "message": "ShopEase Chatbot API",
        "version": "1.0.0",
        "docs": "/docs",
    }


@app.get("/health")
async def health_check():
    return {
        "status": "healthy",
        "service": "shopease-chatbot",
    }
