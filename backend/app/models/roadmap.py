import uuid
from datetime import datetime
from typing import List, Optional, TYPE_CHECKING
from sqlalchemy import String, DateTime, Text, ForeignKey, func
from sqlalchemy.dialects.postgresql import JSONB
from sqlalchemy.orm import Mapped, mapped_column, relationship
from app.database.database import Base
from app.models.profile import GUID

if TYPE_CHECKING:
    from app.models.profile import Profile
    from app.models.task import ProjectTask


class Roadmap(Base):
    __tablename__ = "roadmaps"

    id: Mapped[uuid.UUID] = mapped_column(GUID, primary_key=True, default=uuid.uuid4)
    profile_id: Mapped[uuid.UUID] = mapped_column(GUID, ForeignKey("profiles.id", ondelete="CASCADE"), nullable=False)
    title: Mapped[str] = mapped_column(String(150), nullable=False)
    analysis_summary: Mapped[str] = mapped_column(Text, nullable=False)
    skill_gap_summary: Mapped[Optional[list]] = mapped_column(JSONB().with_variant(Text, "sqlite"), default=list)
    created_at: Mapped[datetime] = mapped_column(DateTime(timezone=True), server_default=func.now())

    # Relationships
    profile: Mapped["Profile"] = relationship("Profile", back_populates="roadmaps")
    tasks: Mapped[List["ProjectTask"]] = relationship("ProjectTask", back_populates="roadmap", cascade="all, delete-orphan")
