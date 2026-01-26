from fastapi import APIRouter, HTTPException
from app.services.vector_store import vector_store
from app.services.context import context_service
from typing import Dict, Any

router = APIRouter(prefix="/admin", tags=["admin"])


@router.post("/index-products")
async def index_products() -> Dict[str, Any]:
    """
    Index all products from MongoDB into Qdrant for vector search.
    This should be called initially and whenever products are updated.
    """
    try:
        # Get all products from MongoDB
        products = context_service.get_all_products(limit=1000)

        if not products:
            return {"message": "No products found to index", "count": 0}

        # Index into Qdrant
        vector_store.upsert_products(products)

        return {
            "message": "Products indexed successfully",
            "count": len(products)
        }
    except Exception as e:
        raise HTTPException(status_code=500, detail=f"Indexing failed: {str(e)}")


@router.post("/reindex-product/{product_id}")
async def reindex_product(product_id: str) -> Dict[str, Any]:
    """Reindex a single product after it's updated."""
    try:
        product = context_service.get_product_by_id(product_id)

        if not product:
            raise HTTPException(status_code=404, detail="Product not found")

        # Convert to format expected by vector store
        product["_id"] = product_id
        vector_store.upsert_products([product])

        return {"message": f"Product {product_id} reindexed successfully"}
    except HTTPException:
        raise
    except Exception as e:
        raise HTTPException(status_code=500, detail=f"Reindexing failed: {str(e)}")


@router.delete("/remove-product/{product_id}")
async def remove_product_from_index(product_id: str) -> Dict[str, Any]:
    """Remove a product from the vector index."""
    try:
        vector_store.delete_product(product_id)
        return {"message": f"Product {product_id} removed from index"}
    except Exception as e:
        raise HTTPException(status_code=500, detail=f"Removal failed: {str(e)}")


@router.get("/index-stats")
async def get_index_stats() -> Dict[str, Any]:
    """Get statistics about the vector index."""
    try:
        collection_info = vector_store.client.get_collection(
            vector_store.products_collection
        )
        return {
            "collection": vector_store.products_collection,
            "points_count": collection_info.points_count,
            "vectors_count": collection_info.vectors_count,
            "status": collection_info.status,
        }
    except Exception as e:
        return {
            "collection": vector_store.products_collection,
            "error": str(e),
            "status": "not_found"
        }
