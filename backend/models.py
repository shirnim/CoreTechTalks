from sqlalchemy import Column, Integer, String, Float, DateTime, Boolean, ForeignKey
from sqlalchemy.sql import func
from database import Base

class Tool(Base):
    __tablename__ = "tools"

    id = Column(Integer, primary_key=True, index=True)
    slug = Column(String, unique=True, index=True)
    name = Column(String, index=True)
    description = Column(String)
    features = Column(String) # comma separated features
    price = Column(Float) # USD double
    file_path = Column(String) # relative robust path

class Order(Base):
    __tablename__ = "orders"

    id = Column(Integer, primary_key=True, index=True)
    email = Column(String, index=True)
    tool_id = Column(Integer, ForeignKey("tools.id"))
    stripe_session_id = Column(String, unique=True, index=True)
    status = Column(String, default="pending") # pending, paid
    created_at = Column(DateTime(timezone=True), server_default=func.now())

class DownloadToken(Base):
    __tablename__ = "download_tokens"

    token = Column(String, primary_key=True, index=True)
    order_id = Column(Integer, ForeignKey("orders.id"))
    expires_at = Column(DateTime(timezone=True))
    used = Column(Boolean, default=False)
