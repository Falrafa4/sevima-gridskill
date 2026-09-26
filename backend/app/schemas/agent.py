from typing import List
import uuid
from pydantic import BaseModel, Field
from app.schemas.profile import ProfileBase, ProfileResponse
from app.schemas.roadmap import RoadmapResponse
from app.schemas.task import TaskResponse


# Schema Request dari Frontend (sesuai PRD 7.1)
class PathwayRequest(BaseModel):
    student_name: str = Field(..., min_length=2, max_length=100, example="Rizky Ramadhan")
    vocational_major: str = Field(..., min_length=2, max_length=100, example="SIJA")
    current_skills: List[str] = Field(default_factory=list, example=["Networking", "Basic Linux", "IoT Arduino"])
    target_industry: str = Field(..., min_length=2, max_length=100, example="Smart Energy & Green Data Center")


# Structured Output dari Gemini (sesuai PRD 7.1)
class TaskItem(BaseModel):
    title: str = Field(..., description="Judul tugas proyek praktis")
    description: str = Field(..., description="Langkah-langkah teknis dan instruksi pengerjaan proyek")
    project_category: str = Field(..., description="Kategori: Hardware, Software, atau Optimization")
    estimated_hours: int = Field(default=2, ge=1, le=40, description="Perkiraan jam pengerjaan")


class AgentOutputSchema(BaseModel):
    roadmap_title: str = Field(..., description="Judul roadmap yang terarah ke industri masa depan")
    analysis_summary: str = Field(..., description="Analisis kesenjangan kurikulum vokasi vs kebutuhan industri nyata")
    skill_gaps: List[str] = Field(..., description="Daftar kesenjangan kompetensi spesifik yang harus ditutupi")
    tasks: List[TaskItem] = Field(..., description="Daftar 3-5 tugas proyek hands-on bertahap")


# Response API Endpoint POST /api/agent/generate-pathway
class PathwayResponse(BaseModel):
    status: str = "success"
    message: str = "Autonomous pathway generated and saved to database"
    profile: ProfileResponse
    roadmap: RoadmapResponse
    tasks: List[TaskResponse]
