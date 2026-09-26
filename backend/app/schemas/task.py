import uuid
from datetime import datetime
from pydantic import BaseModel, ConfigDict, Field


class TaskBase(BaseModel):
    title: str = Field(..., max_length=150, example="Simulasi Monitoring Daya Mikrogrid Menggunakan ESP32")
    description: str = Field(..., example="Merakit sensor arus INA219 ke ESP32 dan mengirimkan data telemetri MQTT.")
    project_category: str = Field(..., max_length=50, example="Hardware")  # Hardware, Software, Optimization
    estimated_hours: int = Field(default=2, ge=1, le=100, example=3)


class TaskCreate(TaskBase):
    pass


class TaskResponse(TaskBase):
    id: uuid.UUID
    roadmap_id: uuid.UUID
    is_completed: bool
    created_at: datetime

    model_config = ConfigDict(from_attributes=True)


class TaskToggleResponse(BaseModel):
    id: uuid.UUID
    roadmap_id: uuid.UUID
    is_completed: bool
    message: str

    model_config = ConfigDict(from_attributes=True)
