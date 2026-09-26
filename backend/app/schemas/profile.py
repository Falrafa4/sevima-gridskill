from typing import List, Optional
import uuid
from datetime import datetime
from pydantic import BaseModel, ConfigDict, Field


class ProfileBase(BaseModel):
    student_name: str = Field(..., min_length=2, max_length=100, example="Rizky Ramadhan")
    vocational_major: str = Field(..., min_length=2, max_length=100, example="SIJA")
    current_skills: List[str] = Field(default_factory=list, example=["Networking", "Basic Linux", "IoT Arduino"])
    target_industry: str = Field(..., min_length=2, max_length=100, example="Smart Energy & Green Data Center")


class ProfileCreate(ProfileBase):
    pass


class ProfileResponse(ProfileBase):
    id: uuid.UUID
    created_at: datetime

    model_config = ConfigDict(from_attributes=True)
