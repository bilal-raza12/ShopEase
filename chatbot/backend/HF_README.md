---
title: ShopEase AI Chatbot
emoji: 🤖
colorFrom: purple
colorTo: indigo
sdk: docker
pinned: false
license: mit
app_port: 7860
---

# ShopEase AI Chatbot API

An intelligent e-commerce chatbot powered by OpenAI Agents SDK.

## Features

- AI-powered shopping assistant
- Product search with semantic understanding
- Order tracking and user context
- Conversation memory

## API Endpoints

- `POST /api/chat` - Send a message
- `GET /api/threads/{user_id}` - Get user's chat threads
- `GET /api/health` - Health check

## Environment Variables Required

Set these as secrets in your HF Space settings:

- `OPENAI_API_KEY`
- `COHERE_API_KEY`
- `QDRANT_URL`
- `QDRANT_API_KEY`
- `MONGODB_URI`
- `DATABASE_URL` (optional, defaults to SQLite)
