from typing import Dict, Any, List, Optional
from bson import ObjectId
from app.database import MongoDB
from app.services.vector_store import vector_store


class ContextService:
    """Service to retrieve context from MongoDB and Qdrant for the chatbot."""

    @staticmethod
    def get_user_context(user_id: str) -> Dict[str, Any]:
        """Get user information from MongoDB."""
        users = MongoDB.get_users_collection()
        user = users.find_one({"_id": ObjectId(user_id)})

        if not user:
            return {"found": False}

        return {
            "found": True,
            "name": user.get("name", ""),
            "email": user.get("email", ""),
            "role": user.get("role", "user"),
            "created_at": str(user.get("createdAt", "")),
        }

    @staticmethod
    def get_user_orders(user_id: str, limit: int = 5) -> List[Dict[str, Any]]:
        """Get recent orders for a user."""
        orders = MongoDB.get_orders_collection()
        user_orders = orders.find(
            {"user": ObjectId(user_id)}
        ).sort("createdAt", -1).limit(limit)

        result = []
        for order in user_orders:
            result.append({
                "order_id": str(order.get("_id")),
                "status": order.get("status", ""),
                "total": order.get("total", 0),
                "items_count": len(order.get("items", [])),
                "items": [
                    {
                        "name": item.get("name", ""),
                        "quantity": item.get("quantity", 0),
                        "price": item.get("price", 0),
                    }
                    for item in order.get("items", [])[:3]  # First 3 items
                ],
                "created_at": str(order.get("createdAt", "")),
                "is_paid": order.get("isPaid", False),
                "is_delivered": order.get("isDelivered", False),
            })

        return result

    @staticmethod
    def get_product_by_id(product_id: str) -> Optional[Dict[str, Any]]:
        """Get a specific product by ID."""
        products = MongoDB.get_products_collection()
        product = products.find_one({"_id": ObjectId(product_id)})

        if not product:
            return None

        return {
            "id": str(product.get("_id")),
            "name": product.get("name", ""),
            "description": product.get("description", ""),
            "price": product.get("price", 0),
            "category": product.get("category", ""),
            "stock": product.get("stock", 0),
            "rating": product.get("rating", 0),
            "features": product.get("features", []),
        }

    @staticmethod
    def search_products(query: str, limit: int = 5) -> List[Dict[str, Any]]:
        """Search products using vector similarity."""
        return vector_store.search_products(query, limit)

    @staticmethod
    def get_all_products(limit: int = 50) -> List[Dict[str, Any]]:
        """Get all products from MongoDB."""
        products = MongoDB.get_products_collection()
        all_products = products.find().limit(limit)

        result = []
        for product in all_products:
            result.append({
                "_id": str(product.get("_id")),
                "name": product.get("name", ""),
                "description": product.get("description", ""),
                "price": product.get("price", 0),
                "category": product.get("category", ""),
                "stock": product.get("stock", 0),
                "rating": product.get("rating", 0),
                "features": product.get("features", []),
                "image": product.get("image", ""),
            })

        return result

    @staticmethod
    def get_categories() -> List[str]:
        """Get all product categories."""
        products = MongoDB.get_products_collection()
        categories = products.distinct("category")
        return categories

    @staticmethod
    def build_context_prompt(user_id: str, query: str) -> str:
        """Build a context-rich prompt for the agent."""
        context_parts = []

        # User context
        user_context = ContextService.get_user_context(user_id)
        if user_context.get("found"):
            context_parts.append(f"""
USER INFORMATION:
- Name: {user_context['name']}
- Email: {user_context['email']}
- Member since: {user_context['created_at']}
""")

        # Recent orders
        orders = ContextService.get_user_orders(user_id, limit=3)
        if orders:
            orders_text = "RECENT ORDERS:\n"
            for order in orders:
                items_str = ", ".join([f"{i['name']} x{i['quantity']}" for i in order['items']])
                orders_text += f"- Order #{order['order_id'][:8]}: {order['status']} - ${order['total']} ({items_str})\n"
            context_parts.append(orders_text)

        # Relevant products (using vector search)
        relevant_products = ContextService.search_products(query, limit=3)
        if relevant_products:
            products_text = "RELEVANT PRODUCTS:\n"
            for product in relevant_products:
                products_text += f"- {product['name']}: ${product['price']} - {product['description'][:100]}...\n"
            context_parts.append(products_text)

        return "\n".join(context_parts)


# Singleton instance
context_service = ContextService()
