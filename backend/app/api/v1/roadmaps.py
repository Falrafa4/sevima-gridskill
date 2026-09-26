import uuid
from fastapi import APIRouter, Depends, Path
from sqlalchemy.orm import Session
from app.database.database import get_db
from app.api.deps import get_current_user
from app.models.user import User
from app.schemas.roadmap import RoadmapResponse
from app.services.pathway_service import PathwayService

router = APIRouter(prefix="/roadmaps", tags=["Roadmaps"])


@router.get(
    "/{profile_id}",
    response_model=RoadmapResponse,
    summary="Get Roadmap with Project Tasks",
    description="Mengambil detail roadmap pembelajaran adaptif beserta seluruh daftar modul tugas proyek untuk profil siswa terkait.",
)
def get_roadmap_by_profile_id(
    profile_id: uuid.UUID = Path(..., description="ID profil siswa"),
    db: Session = Depends(get_db),
    current_user: User = Depends(get_current_user),
):
    return PathwayService.get_roadmap_by_profile_id(db, profile_id)
