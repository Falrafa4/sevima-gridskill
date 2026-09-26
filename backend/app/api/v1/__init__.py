from fastapi import APIRouter
from app.api.v1.agent import router as agent_router
from app.api.v1.roadmaps import router as roadmaps_router
from app.api.v1.tasks import router as tasks_router

api_v1_router = APIRouter(prefix="/api/v1")
api_v1_router.include_router(agent_router)
api_v1_router.include_router(roadmaps_router)
api_v1_router.include_router(tasks_router)

# Juga mount alias /api tanpa prefix /v1 agar kompatibel penuh dengan request PRD (/api/agent/generate-pathway)
api_legacy_router = APIRouter(prefix="/api")
api_legacy_router.include_router(agent_router)
api_legacy_router.include_router(roadmaps_router)
api_legacy_router.include_router(tasks_router)

__all__ = ["api_v1_router", "api_legacy_router"]
