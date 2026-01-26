from pydantic import BaseModel
from typing import Optional, List, Any
from datetime import datetime


class ChatMessageCreate(BaseModel):
    role: str
    content: str
    extra_data: Optional[dict] = None


class ChatMessageResponse(BaseModel):
    id: str
    thread_id: str
    role: str
    content: str
    extra_data: Optional[dict] = None
    created_at: datetime

    class Config:
        from_attributes = True


class ChatThreadCreate(BaseModel):
    user_id: str
    user_name: Optional[str] = None
    user_email: Optional[str] = None
    title: Optional[str] = None


class ChatThreadResponse(BaseModel):
    id: str
    user_id: str
    user_name: Optional[str] = None
    user_email: Optional[str] = None
    title: Optional[str] = None
    created_at: datetime
    updated_at: Optional[datetime] = None
    messages: List[ChatMessageResponse] = []

    class Config:
        from_attributes = True


class ChatRequest(BaseModel):
    message: str
    thread_id: Optional[str] = None
    user_id: str  # MongoDB user ID from JWT


class ChatResponse(BaseModel):
    message: str
    thread_id: str
    context_used: Optional[List[str]] = None  # What context was retrieved
    metadata: Optional[dict] = None
