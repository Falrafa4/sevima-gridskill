import uuid
from datetime import datetime
from typing import TYPE_CHECKING
from sqlalchemy import String, DateTime, Text, Integer, Boolean, ForeignKey, func
from sqlalchemy.orm import Mapped, mapped_column, relationship
from app.database.database import Base
from app.models.profile import GUID

if TYPE_CHECKING:
    from app.models.roadmap import Roadmap


class ProjectTask(Base):
    __tablename__ = "project_tasks"

    id: Mapped[uuid.UUID] = mapped_column(GUID, primary_key=True, default=uuid.uuid4)
    roadmap_id: Mapped[uuid.UUID] = mapped_column(GUID, ForeignKey("roadmaps.id", ondelete="CASCADE"), nullable=False)
    title: Mapped[str] = mapped_column(String(150), nullable=False)
    description: Mapped[str] = mapped_column(Text, nullable=False)
    project_category: Mapped[str] = mapped_column(String(50), nullable=False)  # Hardware, Software, Optimization
    estimated_hours: Mapped[int] = mapped_column(Integer, default=2)
    is_completed: Mapped[bool] = mapped_column(Boolean, default=False)
    created_at: Mapped[datetime] = mapped_column(DateTime(timezone=True), server_default=func.now())

    # Relationships
    roadmap: Mapped["Roadmap"] = relationship("Roadmap", back_populates="tasks")
