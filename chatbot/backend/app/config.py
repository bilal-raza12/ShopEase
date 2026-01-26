from pydantic_settings import BaseSettings
from functools import lru_cache


class Settings(BaseSettings):
    # OpenAI
    openai_api_key: str

    # Cohere
    cohere_api_key: str

    # Qdrant Cloud
    qdrant_url: str
    qdrant_api_key: str

    # Database (SQLite by default, can use PostgreSQL)
    database_url: str = "sqlite:///./chatbot.db"

    # MongoDB (existing ShopEase DB)
    mongodb_uri: str

    # Server
    host: str = "0.0.0.0"
    port: int = 8001
    debug: bool = True

    # Qdrant Collection Names
    products_collection: str = "shopease_products"

    # Cohere Model
    cohere_embed_model: str = "embed-english-v3.0"

    class Config:
        env_file = ".env"
        env_file_encoding = "utf-8"


@lru_cache()
def get_settings() -> Settings:
    return Settings()
