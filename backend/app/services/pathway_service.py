import logging
from typing import Optional
import uuid
from sqlalchemy.orm import Session
from sqlalchemy import select
from app.models.profile import Profile
from app.models.roadmap import Roadmap
from app.models.task import ProjectTask
from app.schemas.agent import PathwayRequest, PathwayResponse, AgentOutputSchema
from app.schemas.profile import ProfileResponse
from app.schemas.roadmap import RoadmapResponse
from app.schemas.task import TaskResponse, TaskToggleResponse
from app.services.gemini_service import GeminiPathwayAgent
from app.core.exceptions import NotFoundException, BadRequestException

logger = logging.getLogger(__name__)


class PathwayService:
    """Service to orchestrate Autonomous AI Agent actions:

    - Calls Gemini with structured output.
    - System Action 1: Saves evaluation & gap analysis to 'roadmaps' table.
    - System Action 2: Performs bulk insert of hands-on project tasks to 'project_tasks' table.
    """

    @classmethod
    async def generate_and_persist_pathway(
        cls,
        db: Session,
        request: PathwayRequest,
    ) -> PathwayResponse:
        """Execute autonomous pipeline end-to-end inside atomic DB transaction."""
        # Step A: Create and persist Student Profile
        profile = Profile(
            student_name=request.student_name,
            vocational_major=request.vocational_major,
            current_skills=request.current_skills,
            target_industry=request.target_industry,
        )
        db.add(profile)
        db.flush()  # Populates profile.id without full commit

        # Step B: Autonomous Gemini Analysis (Structured Output)
        agent_plan: AgentOutputSchema = await GeminiPathwayAgent.generate_pathway_plan(request)

        # Step C: [AKSI SISTEM 1] Insert Evaluation & Roadmap to 'roadmaps' table
        roadmap = Roadmap(
            profile_id=profile.id,
            title=agent_plan.roadmap_title,
            analysis_summary=agent_plan.analysis_summary,
            skill_gap_summary=agent_plan.skill_gaps,
        )
        db.add(roadmap)
        db.flush()  # Populates roadmap.id

        # Step D: [AKSI SISTEM 2] Bulk insert project tasks into 'project_tasks' table
        task_entities = [
            ProjectTask(
                roadmap_id=roadmap.id,
                title=t.title,
                description=t.description,
                project_category=t.project_category,
                estimated_hours=t.estimated_hours,
                is_completed=False,
            )
            for t in agent_plan.tasks
        ]
        db.add_all(task_entities)
        db.commit()

        # Step E: Refresh for clean response serialization
        db.refresh(profile)
        db.refresh(roadmap)
        for t in task_entities:
            db.refresh(t)

        task_responses = [TaskResponse.model_validate(t) for t in task_entities]

        return PathwayResponse(
            status="success",
            message="Autonomous pathway generated and saved to database successfully",
            profile=ProfileResponse.model_validate(profile),
            roadmap=RoadmapResponse(
                id=roadmap.id,
                profile_id=roadmap.profile_id,
                title=roadmap.title,
                analysis_summary=roadmap.analysis_summary,
                skill_gap_summary=roadmap.skill_gap_summary or [],
                created_at=roadmap.created_at,
                tasks=task_responses,
            ),
            tasks=task_responses,
        )

    @classmethod
    def get_roadmap_by_profile_id(cls, db: Session, profile_id: uuid.UUID) -> RoadmapResponse:
        """Fetch roadmap and its associated project tasks for a given profile."""
        stmt = (
            select(Roadmap)
            .where(Roadmap.profile_id == profile_id)
            .order_by(Roadmap.created_at.desc())
        )
        roadmap = db.execute(stmt).scalars().first()

        if not roadmap:
            raise NotFoundException(f"Roadmap untuk profile_id {profile_id} tidak ditemukan.")

        task_stmt = (
            select(ProjectTask)
            .where(ProjectTask.roadmap_id == roadmap.id)
            .order_by(ProjectTask.created_at.asc())
        )
        tasks = db.execute(task_stmt).scalars().all()

        task_responses = [TaskResponse.model_validate(t) for t in tasks]

        return RoadmapResponse(
            id=roadmap.id,
            profile_id=roadmap.profile_id,
            title=roadmap.title,
            analysis_summary=roadmap.analysis_summary,
            skill_gap_summary=roadmap.skill_gap_summary or [],
            created_at=roadmap.created_at,
            tasks=task_responses,
        )

    @classmethod
    def toggle_task_status(cls, db: Session, task_id: uuid.UUID) -> TaskToggleResponse:
        """Toggle is_completed boolean status for interactive checklist."""
        stmt = select(ProjectTask).where(ProjectTask.id == task_id)
        task = db.execute(stmt).scalars().first()

        if not task:
            raise NotFoundException(f"Tugas proyek dengan id {task_id} tidak ditemukan.")

        task.is_completed = not task.is_completed
        db.commit()
        db.refresh(task)

        status_text = "selesai" if task.is_completed else "belum selesai"
        return TaskToggleResponse(
            id=task.id,
            roadmap_id=task.roadmap_id,
            is_completed=task.is_completed,
            message=f"Status tugas proyek berhasil diubah menjadi {status_text}.",
        )
