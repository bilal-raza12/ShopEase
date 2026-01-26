from fastapi import APIRouter, Depends, HTTPException
from sqlalchemy.ext.asyncio import AsyncSession
from sqlalchemy import select
from typing import List, Optional
from app.database import get_db
from app.models.chat import ChatThread, ChatMessage
from app.schemas.chat import ChatRequest, ChatResponse, ChatThreadResponse, ChatMessageResponse
from app.services.agent import shopease_agent
from app.services.context import context_service
import uuid

router = APIRouter(prefix="/chat", tags=["chat"])


@router.post("/", response_model=ChatResponse)
async def send_message(
    request: ChatRequest,
    db: AsyncSession = Depends(get_db)
):
    """Send a message to the chatbot and get a response."""

    thread_id = request.thread_id

    # Create new thread if needed
    if not thread_id:
        # Get user info for the thread
        user_context = context_service.get_user_context(request.user_id)

        new_thread = ChatThread(
            id=str(uuid.uuid4()),
            user_id=request.user_id,
            user_name=user_context.get("name") if user_context.get("found") else None,
            user_email=user_context.get("email") if user_context.get("found") else None,
        )
        db.add(new_thread)
        await db.commit()
        thread_id = new_thread.id
    else:
        # Verify thread exists and belongs to user
        result = await db.execute(
            select(ChatThread).where(
                ChatThread.id == thread_id,
                ChatThread.user_id == request.user_id
            )
        )
        thread = result.scalar_one_or_none()
        if not thread:
            raise HTTPException(status_code=404, detail="Thread not found")

    # Get thread history
    result = await db.execute(
        select(ChatMessage)
        .where(ChatMessage.thread_id == thread_id)
        .order_by(ChatMessage.created_at)
    )
    messages = result.scalars().all()

    thread_history = [
        {"role": msg.role, "content": msg.content}
        for msg in messages
    ]

    # Save user message
    user_message = ChatMessage(
        id=str(uuid.uuid4()),
        thread_id=thread_id,
        role="user",
        content=request.message,
    )
    db.add(user_message)

    # Get agent response
    try:
        response_text = await shopease_agent.chat(
            user_id=request.user_id,
            message=request.message,
            thread_history=thread_history,
        )
    except Exception as e:
        await db.rollback()
        raise HTTPException(status_code=500, detail=f"Agent error: {str(e)}")

    # Save assistant message
    assistant_message = ChatMessage(
        id=str(uuid.uuid4()),
        thread_id=thread_id,
        role="assistant",
        content=response_text,
    )
    db.add(assistant_message)
    await db.commit()

    return ChatResponse(
        message=response_text,
        thread_id=thread_id,
    )


@router.get("/threads", response_model=List[ChatThreadResponse])
async def get_threads(
    user_id: str,
    db: AsyncSession = Depends(get_db)
):
    """Get all chat threads for a user."""
    result = await db.execute(
        select(ChatThread)
        .where(ChatThread.user_id == user_id)
        .order_by(ChatThread.created_at.desc())
    )
    threads = result.scalars().all()

    return threads


@router.get("/threads/{thread_id}", response_model=ChatThreadResponse)
async def get_thread(
    thread_id: str,
    user_id: str,
    db: AsyncSession = Depends(get_db)
):
    """Get a specific thread with all messages."""
    result = await db.execute(
        select(ChatThread)
        .where(ChatThread.id == thread_id, ChatThread.user_id == user_id)
    )
    thread = result.scalar_one_or_none()

    if not thread:
        raise HTTPException(status_code=404, detail="Thread not found")

    # Get messages
    messages_result = await db.execute(
        select(ChatMessage)
        .where(ChatMessage.thread_id == thread_id)
        .order_by(ChatMessage.created_at)
    )
    messages = messages_result.scalars().all()

    return ChatThreadResponse(
        id=thread.id,
        user_id=thread.user_id,
        user_name=thread.user_name,
        user_email=thread.user_email,
        title=thread.title,
        created_at=thread.created_at,
        updated_at=thread.updated_at,
        messages=[
            ChatMessageResponse(
                id=msg.id,
                thread_id=msg.thread_id,
                role=msg.role,
                content=msg.content,
                extra_data=msg.extra_data,
                created_at=msg.created_at,
            )
            for msg in messages
        ],
    )


@router.delete("/threads/{thread_id}")
async def delete_thread(
    thread_id: str,
    user_id: str,
    db: AsyncSession = Depends(get_db)
):
    """Delete a chat thread."""
    result = await db.execute(
        select(ChatThread)
        .where(ChatThread.id == thread_id, ChatThread.user_id == user_id)
    )
    thread = result.scalar_one_or_none()

    if not thread:
        raise HTTPException(status_code=404, detail="Thread not found")

    await db.delete(thread)
    await db.commit()

    return {"message": "Thread deleted successfully"}
