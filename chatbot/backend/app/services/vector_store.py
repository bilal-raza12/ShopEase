from qdrant_client import QdrantClient
from qdrant_client.http import models
from typing import List, Dict, Any, Optional
import uuid
from app.config import get_settings
from app.services.embeddings import embedding_service

settings = get_settings()


def mongo_id_to_uuid(mongo_id: str) -> str:
    """Convert MongoDB ObjectId to a deterministic UUID."""
    # Create a UUID based on the ObjectId string
    return str(uuid.uuid5(uuid.NAMESPACE_DNS, mongo_id))


class VectorStoreService:
    def __init__(self):
        self.client = QdrantClient(
            url=settings.qdrant_url,
            api_key=settings.qdrant_api_key,
        )
        self.products_collection = settings.products_collection

    def ensure_collection(self, collection_name: str, vector_size: int = 1024):
        """Create collection if it doesn't exist."""
        collections = self.client.get_collections().collections
        exists = any(c.name == collection_name for c in collections)

        if not exists:
            self.client.create_collection(
                collection_name=collection_name,
                vectors_config=models.VectorParams(
                    size=vector_size,  # Cohere embed-english-v3.0 dimension
                    distance=models.Distance.COSINE,
                ),
            )

    def upsert_products(self, products: List[Dict[str, Any]]):
        """Index products into Qdrant."""
        self.ensure_collection(self.products_collection)

        points = []
        for product in products:
            # Create rich text for embedding
            text = f"""
            Product: {product.get('name', '')}
            Category: {product.get('category', '')}
            Description: {product.get('description', '')}
            Price: ${product.get('price', 0)}
            Features: {', '.join(product.get('features', []))}
            """.strip()

            embedding = embedding_service.embed_text(text)

            mongo_id = str(product.get('_id'))
            points.append(models.PointStruct(
                id=mongo_id_to_uuid(mongo_id),
                vector=embedding,
                payload={
                    "mongo_id": mongo_id,  # Keep original ID for reference
                    "name": product.get('name', ''),
                    "description": product.get('description', ''),
                    "price": product.get('price', 0),
                    "category": product.get('category', ''),
                    "stock": product.get('stock', 0),
                    "image": product.get('image', ''),
                    "features": product.get('features', []),
                    "rating": product.get('rating', 0),
                }
            ))

        if points:
            self.client.upsert(
                collection_name=self.products_collection,
                points=points,
            )

    def search_products(self, query: str, limit: int = 5) -> List[Dict[str, Any]]:
        """Search for relevant products."""
        query_embedding = embedding_service.embed_query(query)

        results = self.client.query_points(
            collection_name=self.products_collection,
            query=query_embedding,
            limit=limit,
        )

        return [
            {
                "id": str(hit.id),
                "score": hit.score,
                **hit.payload,
            }
            for hit in results.points
        ]

    def delete_product(self, product_id: str):
        """Delete a product from the index."""
        self.client.delete(
            collection_name=self.products_collection,
            points_selector=models.PointIdsList(points=[mongo_id_to_uuid(product_id)]),
        )


# Singleton instance
vector_store = VectorStoreService()
