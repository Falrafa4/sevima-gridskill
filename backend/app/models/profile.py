import uuid
from datetime import datetime
from typing import List, Optional
from sqlalchemy import String, DateTime, Text, func
from sqlalchemy.dialects.postgresql import UUID as PG_UUID, JSONB, ARRAY
from sqlalchemy.types import TypeDecorator, CHAR
from sqlalchemy.orm import Mapped, mapped_column, relationship
from app.database.database import Base


# Universal UUID Type compatible with PostgreSQL and SQLite
class GUID(TypeDecorator):
    """Platform-independent GUID type. Uses PostgreSQL's UUID type, otherwise uses CHAR(36)."""
    impl = CHAR
    cache_ok = True

    def load_dialect_impl(self, dialect):
        if dialect.name == "postgresql":
            return dialect.type_descriptor(PG_UUID(as_uuid=True))
        return dialect.type_descriptor(CHAR(36))

    def process_bind_param(self, value, dialect):
        if value is None:
            return value
        elif dialect.name == "postgresql":
            return str(value)
        else:
            if not isinstance(value, uuid.UUID):
                return str(uuid.UUID(str(value)))
            return str(value)

    def process_result_value(self, value, dialect):
        if value is None:
            return value
        if not isinstance(value, uuid.UUID):
            return uuid.UUID(str(value))
        return value


class Profile(Base):
    __tablename__ = "profiles"

    id: Mapped[uuid.UUID] = mapped_column(GUID, primary_key=True, default=uuid.uuid4)
    student_name: Mapped[str] = mapped_column(String(100), nullable=False)
    vocational_major: Mapped[str] = mapped_column(String(100), nullable=False)
    # Stored as JSON list for SQLite compatibility while supporting array of strings
    current_skills: Mapped[Optional[list]] = mapped_column(JSONB().with_variant(Text, "sqlite"), default=list)
    target_industry: Mapped[str] = mapped_column(String(100), nullable=False)
    created_at: Mapped[datetime] = mapped_column(DateTime(timezone=True), server_default=func.now())

    # Relationships
    roadmaps: Mapped[List["Roadmap"]] = relationship("Roadmap", back_populates="profile", cascade="all, delete-orphan")
