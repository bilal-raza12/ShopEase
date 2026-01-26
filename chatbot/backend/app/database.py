from sqlalchemy.ext.asyncio import create_async_engine, AsyncSession, async_sessionmaker
from sqlalchemy.orm import DeclarativeBase
from pymongo import MongoClient
from app.config import get_settings

settings = get_settings()


# Database URL handling
def get_async_database_url(url: str) -> str:
    """Convert database URL to async version."""
    # Already async URL
    if "+aiosqlite" in url or "+asyncpg" in url or "+psycopg" in url:
        return url
    if url.startswith("sqlite:///"):
        # SQLite async
        return url.replace("sqlite:///", "sqlite+aiosqlite:///", 1)
    elif url.startswith("postgresql://"):
        # PostgreSQL async
        return url.replace("postgresql://", "postgresql+asyncpg://", 1)
    return url


engine = create_async_engine(
    get_async_database_url(settings.database_url),
    echo=settings.debug,
)

AsyncSessionLocal = async_sessionmaker(
    engine,
    class_=AsyncSession,
    expire_on_commit=False,
)


class Base(DeclarativeBase):
    pass


async def get_db() -> AsyncSession:
    async with AsyncSessionLocal() as session:
        try:
            yield session
        finally:
            await session.close()


async def init_db():
    async with engine.begin() as conn:
        await conn.run_sync(Base.metadata.create_all)


# MongoDB Setup (for accessing existing ShopEase data)
class MongoDB:
    client: MongoClient = None
    db = None

    @classmethod
    def connect(cls):
        cls.client = MongoClient(settings.mongodb_uri)
        cls.db = cls.client.shopease

    @classmethod
    def close(cls):
        if cls.client:
            cls.client.close()

    @classmethod
    def get_users_collection(cls):
        return cls.db.users

    @classmethod
    def get_products_collection(cls):
        return cls.db.products

    @classmethod
    def get_orders_collection(cls):
        return cls.db.orders
