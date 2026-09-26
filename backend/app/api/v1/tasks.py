import uuid
from fastapi import APIRouter, Depends, Path
from sqlalchemy.orm import Session
from app.database.database import get_db
from app.api.deps import get_current_user
from app.models.user import User
from app.schemas.task import TaskToggleResponse
from app.services.pathway_service import PathwayService

router = APIRouter(prefix="/tasks", tags=["Project Tasks"])


@router.patch(
    "/{task_id}/toggle",
    response_model=TaskToggleResponse,
    summary="Toggle Project Task Completion Status",
    description="Mengubah status is_completed (true/false) untuk mencatat kemajuan belajar dan pengerjaan proyek siswa secara interaktif.",
)
def toggle_task(
    task_id: uuid.UUID = Path(..., description="ID tugas proyek"),
    db: Session = Depends(get_db),
    current_user: User = Depends(get_current_user),
):
    return PathwayService.toggle_task_status(db, task_id)
