import os
from openai import OpenAI
from agents import Agent, Runner, function_tool, set_default_openai_key
from typing import List, Dict, Any, Optional
from app.config import get_settings
from app.services.context import context_service
from app.database import MongoDB

settings = get_settings()

# Set the OpenAI API key for the agents SDK
os.environ["OPENAI_API_KEY"] = settings.openai_api_key
set_default_openai_key(settings.openai_api_key)

# Initialize OpenAI client
client = OpenAI(api_key=settings.openai_api_key)


# Define tools for the agent
@function_tool
def search_products(query: str) -> str:
    """
    Search for products in the ShopEase store based on a query.
    Use this when the user asks about products, wants recommendations, or is looking for something to buy.

    Args:
        query: The search query describing what the user is looking for

    Returns:
        A formatted string with matching products
    """
    products = context_service.search_products(query, limit=5)

    if not products:
        return "No products found matching your query."

    result = "Here are the products I found:\n\n"
    for i, product in enumerate(products, 1):
        result += f"{i}. **{product['name']}**\n"
        result += f"   - Price: ${product['price']}\n"
        result += f"   - Category: {product['category']}\n"
        result += f"   - Rating: {product.get('rating', 'N/A')} stars\n"
        result += f"   - {product['description'][:150]}...\n"
        if product.get('stock', 0) > 0:
            result += f"   - In Stock: {product['stock']} available\n"
        else:
            result += f"   - Currently Out of Stock\n"
        result += "\n"

    return result


@function_tool
def get_order_status(user_id: str, order_id: Optional[str] = None) -> str:
    """
    Get the status of user's orders. Can get all recent orders or a specific order.

    Args:
        user_id: The user's ID
        order_id: Optional specific order ID to look up

    Returns:
        Order status information
    """
    orders = context_service.get_user_orders(user_id, limit=5)

    if not orders:
        return "You don't have any orders yet. Start shopping to place your first order!"

    if order_id:
        # Find specific order
        for order in orders:
            if order['order_id'].startswith(order_id) or order_id in order['order_id']:
                items_str = ", ".join([f"{i['name']} x{i['quantity']}" for i in order['items']])
                return f"""
Order #{order['order_id'][:8]}
- Status: {order['status'].upper()}
- Total: ${order['total']}
- Items: {items_str}
- Paid: {'Yes' if order['is_paid'] else 'No'}
- Delivered: {'Yes' if order['is_delivered'] else 'No'}
- Placed on: {order['created_at']}
"""
        return f"I couldn't find an order with ID containing '{order_id}'. Please check the order ID and try again."

    # Return all recent orders
    result = "Here are your recent orders:\n\n"
    for order in orders:
        items_str = ", ".join([f"{i['name']} x{i['quantity']}" for i in order['items']])
        result += f"**Order #{order['order_id'][:8]}**\n"
        result += f"- Status: {order['status'].upper()}\n"
        result += f"- Total: ${order['total']}\n"
        result += f"- Items: {items_str}\n\n"

    return result


@function_tool
def get_product_categories() -> str:
    """
    Get all available product categories in the store.

    Returns:
        List of categories
    """
    categories = context_service.get_categories()

    if not categories:
        return "No categories available at the moment."

    return f"We have products in the following categories:\n" + "\n".join([f"- {cat}" for cat in categories])


@function_tool
def get_product_details(product_name: str) -> str:
    """
    Get detailed information about a specific product.

    Args:
        product_name: The name of the product to look up

    Returns:
        Detailed product information
    """
    products = context_service.search_products(product_name, limit=1)

    if not products:
        return f"I couldn't find a product called '{product_name}'. Try searching with different keywords."

    product = products[0]
    features = "\n".join([f"  - {f}" for f in product.get('features', [])]) if product.get('features') else "  - No features listed"

    return f"""
**{product['name']}**

Category: {product['category']}
Price: ${product['price']}
Rating: {product.get('rating', 'N/A')} stars
Stock: {product.get('stock', 0)} available

Description:
{product['description']}

Features:
{features}
"""


class ShopEaseAgent:
    """AI Agent for ShopEase customer assistance."""

    def __init__(self):
        self.agent = Agent(
            name="ShopEase Assistant",
            instructions=self._get_system_prompt(),
            model="gpt-4o",
            tools=[search_products, get_order_status, get_product_categories, get_product_details],
        )

    def _get_system_prompt(self) -> str:
        return """You are ShopEase Assistant, a friendly and helpful AI shopping assistant for the ShopEase e-commerce platform.

## Your Personality
- Warm, friendly, and professional
- Always address users by their name when known
- Be concise but helpful
- Use a conversational tone

## Your Capabilities
1. **Product Search & Recommendations**: Help users find products, give recommendations based on their needs
2. **Order Assistance**: Check order status, explain order details
3. **Shopping Guidance**: Guide users through the shopping process, explain features
4. **General Help**: Answer questions about the store, policies, and products

## Important Guidelines
- ALWAYS greet users by name if their name is provided in the context
- When recommending products, consider the user's past orders and preferences
- If a user asks about an order, use the get_order_status tool
- For product searches, use the search_products tool
- Be proactive in offering help and suggestions
- If you don't know something, be honest and offer to help find the answer

## Response Format
- Keep responses concise and scannable
- Use bullet points and formatting for clarity
- Include relevant product details when discussing products
- Always end with a helpful follow-up question or offer

## Example Interactions
User: "Hi"
Assistant: "Hello [Name]! Welcome to ShopEase! I'm here to help you with anything you need - whether it's finding the perfect product, checking on an order, or just browsing. What can I help you with today?"

User: "Where's my order?"
Assistant: [Uses get_order_status tool and provides clear status update]

User: "I need a gift for my mom"
Assistant: [Uses search_products tool and provides thoughtful recommendations]
"""

    async def chat(self, user_id: str, message: str, thread_history: List[Dict[str, str]] = None) -> str:
        """Process a chat message and return the agent's response."""

        # Get user context
        user_context = context_service.get_user_context(user_id)
        context_prompt = context_service.build_context_prompt(user_id, message)

        # Build messages with context
        messages = []

        # Add context as a system message
        if context_prompt:
            messages.append({
                "role": "system",
                "content": f"Current user context:\n{context_prompt}"
            })

        # Add user name context
        if user_context.get("found"):
            messages.append({
                "role": "system",
                "content": f"The user's name is {user_context['name']}. Address them by name."
            })

        # Add thread history
        if thread_history:
            for msg in thread_history[-10:]:  # Last 10 messages for context
                messages.append({
                    "role": msg["role"],
                    "content": msg["content"]
                })

        # Add current message
        messages.append({
            "role": "user",
            "content": message
        })

        # Run the agent (async)
        result = await Runner.run(
            self.agent,
            messages,
        )

        return result.final_output


# Singleton instance
shopease_agent = ShopEaseAgent()
