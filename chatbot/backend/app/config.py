from pydantic_settings import BaseSettings
from pydantic import field_validator
from functools import lru_cache


class Settings(BaseSettings):
    # OpenAI
    openai_api_key: str

    # Cohere
    cohere_api_key: str

    # Qdrant Cloud
    qdrant_url: str
    qdrant_api_key: str

    # Database (SQLite in /tmp for HF Spaces, can use PostgreSQL)
    database_url: str = "sqlite+aiosqlite:////tmp/chatbot.db"

    # MongoDB (existing ShopEase DB)
    mongodb_uri: str

    # Server
    host: str = "0.0.0.0"
    port: int = 7860  # HF Spaces default port
    debug: bool = False

    # Qdrant Collection Names
    products_collection: str = "shopease_products"

    # Cohere Model
    cohere_embed_model: str = "embed-english-v3.0"

    # Strip whitespace from all API keys
    @field_validator('openai_api_key', 'cohere_api_key', 'qdrant_api_key', 'qdrant_url', 'mongodb_uri', mode='before')
    @classmethod
    def strip_whitespace(cls, v):
        if isinstance(v, str):
            return v.strip()
        return v

    class Config:
        env_file = ".env"
        env_file_encoding = "utf-8"


@lru_cache()
def get_settings() -> Settings:
    return Settings()
