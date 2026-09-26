import pytest
from fastapi.testclient import TestClient
from app.main import app

client = TestClient(app)


def test_root_endpoint():
    response = client.get("/")
    assert response.status_code == 200
    data = response.json()
    assert data["app"] == "GridSkill Backend API"
    assert data["docs"] == "/docs"


def test_health_endpoint():
    response = client.get("/health")
    assert response.status_code == 200
    data = response.json()
    assert data["status"] == "healthy"
    assert data["database"] == "connected"


def test_generate_pathway_flow_and_subsequent_reads():
    payload = {
        "student_name": "Rizky Ramadhan",
        "vocational_major": "SIJA",
        "current_skills": ["Networking", "Basic Linux", "IoT Arduino"],
        "target_industry": "Smart Energy & Green Data Center",
    }

    # 1. Test POST /api/v1/agent/generate-pathway
    post_res = client.post("/api/v1/agent/generate-pathway", json=payload)
    assert post_res.status_code == 201
    res_data = post_res.json()
    assert res_data["status"] == "success"

    profile = res_data["profile"]
    roadmap = res_data["roadmap"]
    tasks = res_data["tasks"]

    assert profile["student_name"] == payload["student_name"]
    assert profile["vocational_major"] == payload["vocational_major"]
    assert len(roadmap["skill_gap_summary"]) >= 1
    assert len(tasks) >= 3

    profile_id = profile["id"]
    task_id = tasks[0]["id"]

    # 2. Test GET /api/v1/roadmaps/{profile_id}
    get_res = client.get(f"/api/v1/roadmaps/{profile_id}")
    assert get_res.status_code == 200
    roadmap_data = get_res.json()
    assert roadmap_data["profile_id"] == profile_id
    assert len(roadmap_data["tasks"]) == len(tasks)

    # 3. Test PATCH /api/v1/tasks/{task_id}/toggle
    patch_res = client.patch(f"/api/v1/tasks/{task_id}/toggle")
    assert patch_res.status_code == 200
    toggle_data = patch_res.json()
    assert toggle_data["id"] == task_id
    assert toggle_data["is_completed"] is True

    # 4. Test validation error handling (422)
    invalid_payload = {"student_name": "R"}  # missing vocational_major & target_industry
    val_res = client.post("/api/v1/agent/generate-pathway", json=invalid_payload)
    assert val_res.status_code == 422
    assert val_res.json()["code"] == "VALIDATION_ERROR"
