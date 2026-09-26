from fastapi import APIRouter, Depends, status
from sqlalchemy.orm import Session
from app.database.database import get_db
from app.api.deps import get_current_user
from app.models.user import User
from app.schemas.agent import PathwayRequest, PathwayResponse
from app.services.pathway_service import PathwayService

router = APIRouter(prefix="/agent", tags=["Autonomous Agent"])


@router.post(
    "/generate-pathway",
    response_model=PathwayResponse,
    status_code=status.HTTP_201_CREATED,
    summary="Generate Autonomous Adaptive Pathway",
    description=(
        "Memicu Autonomous AI Agent untuk menganalisis kesenjangan kompetensi siswa vokasi "
        "dan secara mandiri mengeksekusi 2 aksi sistem ke database: "
        "1. Menyimpan ringkasan analisis kesenjangan ke tabel 'roadmaps'. "
        "2. Melakukan bulk insert batch modul tugas proyek nyata ke tabel 'project_tasks'."
    ),
)
async def generate_pathway(
    request: PathwayRequest,
    db: Session = Depends(get_db),
    current_user: User = Depends(get_current_user),
):
    return await PathwayService.generate_and_persist_pathway(db, request, user_id=current_user.id)
