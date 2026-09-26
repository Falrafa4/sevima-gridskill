from typing import List, Optional
import uuid
from datetime import datetime
from pydantic import BaseModel, ConfigDict, Field
from app.schemas.task import TaskResponse
from app.schemas.profile import ProfileResponse


class RoadmapBase(BaseModel):
    title: str = Field(..., max_length=150, json_schema_extra={"example": "Roadmap Transisi SIJA ke Green Data Center & Smart Grid"})
    analysis_summary: str = Field(..., json_schema_extra={"example": "Siswa memiliki pondasi jaringan dan IoT dasar yang relevan."})
    skill_gap_summary: List[str] = Field(default_factory=list, json_schema_extra={"example": ["Protokol Modbus/MQTT Industri", "Monitoring Efisiensi PUE"]})


class RoadmapCreate(RoadmapBase):
    profile_id: uuid.UUID


class RoadmapResponse(RoadmapBase):
    id: uuid.UUID
    profile_id: uuid.UUID
    created_at: datetime
    tasks: List[TaskResponse] = Field(default_factory=list)
    profile: Optional[ProfileResponse] = None

    model_config = ConfigDict(from_attributes=True)
