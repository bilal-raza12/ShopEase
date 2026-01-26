import cohere
from typing import List
from app.config import get_settings

settings = get_settings()


class EmbeddingService:
    def __init__(self):
        self.client = cohere.Client(settings.cohere_api_key)
        self.model = settings.cohere_embed_model

    def embed_text(self, text: str) -> List[float]:
        """Generate embedding for a single text."""
        response = self.client.embed(
            texts=[text],
            model=self.model,
            input_type="search_document",
        )
        return response.embeddings[0]

    def embed_query(self, query: str) -> List[float]:
        """Generate embedding for a search query."""
        response = self.client.embed(
            texts=[query],
            model=self.model,
            input_type="search_query",
        )
        return response.embeddings[0]

    def embed_batch(self, texts: List[str], input_type: str = "search_document") -> List[List[float]]:
        """Generate embeddings for multiple texts."""
        response = self.client.embed(
            texts=texts,
            model=self.model,
            input_type=input_type,
        )
        return response.embeddings


# Singleton instance
embedding_service = EmbeddingService()
