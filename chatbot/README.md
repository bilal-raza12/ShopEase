# ShopEase AI Chatbot

AI-powered chatbot for the ShopEase e-commerce platform using OpenAI Agents SDK, Qdrant, and Cohere embeddings.

## Architecture

```
┌────────────────────────────────────────────────────┐
│                 FastAPI + UV                        │
├────────────────────────────────────────────────────┤
│                                                    │
│  ┌──────────────────┐    ┌──────────────────────┐ │
│  │   PostgreSQL     │    │    Qdrant Cloud      │ │
│  ├──────────────────┤    ├──────────────────────┤ │
│  │ • Chat threads   │    │ • Product embeddings │ │
│  │ • Messages       │    │ • Semantic search    │ │
│  │ • User sessions  │    │                      │ │
│  │ • Agent memory   │    │  ↑ Cohere embed-v3   │ │
│  └──────────────────┘    └──────────────────────┘ │
│                                                    │
│  ┌──────────────────────────────────────────────┐ │
│  │      OpenAI Agents SDK + OpenAI API          │ │
│  └──────────────────────────────────────────────┘ │
│                                                    │
└────────────────────────────────────────────────────┘
          ↓
┌────────────────────────────────────────────────────┐
│              ChatWidget (React UI)                  │
└────────────────────────────────────────────────────┘
```

## Features

- **Personalized Responses**: Greets users by name, knows their order history
- **Product Search**: Semantic search using Cohere embeddings + Qdrant
- **Order Tracking**: Check order status and history
- **Shopping Guidance**: Help users find products and navigate the store
- **Context-Aware**: Maintains conversation history and user context

## Backend Setup

### Prerequisites

- Python 3.11+
- UV package manager
- PostgreSQL database
- Qdrant Cloud account
- OpenAI API key
- Cohere API key

### Installation

1. Navigate to the backend directory:
```bash
cd chatbot/backend
```

2. Create virtual environment and install dependencies:
```bash
uv venv
uv sync
```

3. Create `.env` file:
```bash
cp .env.example .env
```

4. Update `.env` with your credentials:
```env
# OpenAI Configuration
OPENAI_API_KEY=sk-...

# Cohere Configuration
COHERE_API_KEY=...

# Qdrant Cloud Configuration
QDRANT_URL=https://your-cluster.qdrant.io
QDRANT_API_KEY=...

# PostgreSQL Configuration
DATABASE_URL=postgresql://user:password@localhost:5432/shopease_chatbot

# MongoDB Configuration (existing ShopEase database)
MONGODB_URI=mongodb+srv://...
```

5. Run the server:
```bash
uv run python run.py
```

Or with uvicorn directly:
```bash
uv run uvicorn app.main:app --reload --host 0.0.0.0 --port 8000
```

### Index Products

After starting the server, index your products for vector search:
```bash
curl -X POST http://localhost:8000/api/admin/index-products
```

## Frontend Integration

### Add ChatWidget to your React app

1. Copy the chatbot frontend files to your main frontend:
```bash
cp -r chatbot/frontend/src/components/ChatWidget.* Frontend/src/components/
cp -r chatbot/frontend/src/services/chatApi.js Frontend/src/services/
cp -r chatbot/frontend/src/hooks/useChat.js Frontend/src/hooks/
```

2. Add the environment variable to your frontend `.env`:
```env
REACT_APP_CHATBOT_API_URL=http://localhost:8000/api
```

3. Import and use the ChatWidget in your App.js:
```jsx
import ChatWidget from './components/ChatWidget';
import { useAuth } from './context/AuthContext';

function App() {
  const { user } = useAuth();

  return (
    <div className="App">
      {/* Your existing app content */}

      {/* Add ChatWidget - only show for logged in users */}
      {user && (
        <ChatWidget
          userId={user._id}
          userName={user.name}
        />
      )}
    </div>
  );
}
```

## API Endpoints

### Chat

| Method | Endpoint | Description |
|--------|----------|-------------|
| POST | `/api/chat/` | Send a message |
| GET | `/api/chat/threads` | Get user's threads |
| GET | `/api/chat/threads/{id}` | Get thread with messages |
| DELETE | `/api/chat/threads/{id}` | Delete a thread |

### Admin

| Method | Endpoint | Description |
|--------|----------|-------------|
| POST | `/api/admin/index-products` | Index all products |
| POST | `/api/admin/reindex-product/{id}` | Reindex single product |
| DELETE | `/api/admin/remove-product/{id}` | Remove from index |
| GET | `/api/admin/index-stats` | Get index statistics |

## Agent Capabilities

The chatbot can:

1. **Search Products** - Find products based on user queries
2. **Get Order Status** - Check order history and specific orders
3. **List Categories** - Show available product categories
4. **Get Product Details** - Provide detailed product information

## Project Structure

```
chatbot/
├── backend/
│   ├── app/
│   │   ├── config.py          # Settings
│   │   ├── database.py        # DB connections
│   │   ├── main.py            # FastAPI app
│   │   ├── models/            # SQLAlchemy models
│   │   ├── schemas/           # Pydantic schemas
│   │   ├── services/          # Business logic
│   │   │   ├── agent.py       # OpenAI Agent
│   │   │   ├── embeddings.py  # Cohere
│   │   │   ├── vector_store.py# Qdrant
│   │   │   └── context.py     # Context retrieval
│   │   └── routers/           # API routes
│   ├── pyproject.toml         # Dependencies
│   ├── run.py                 # Entry point
│   └── .env.example
└── frontend/
    └── src/
        ├── components/
        │   ├── ChatWidget.jsx
        │   └── ChatWidget.css
        ├── hooks/
        │   └── useChat.js
        └── services/
            └── chatApi.js
```

## Environment Variables

| Variable | Description |
|----------|-------------|
| `OPENAI_API_KEY` | OpenAI API key |
| `COHERE_API_KEY` | Cohere API key |
| `QDRANT_URL` | Qdrant Cloud URL |
| `QDRANT_API_KEY` | Qdrant API key |
| `DATABASE_URL` | PostgreSQL connection string |
| `MONGODB_URI` | MongoDB connection string |
