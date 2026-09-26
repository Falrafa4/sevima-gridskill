import uuid
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


def test_auth_registration_and_login():
    unique_email = f"test_{uuid.uuid4().hex[:8]}@gridskill.id"
    register_payload = {
        "email": unique_email,
        "password": "securepassword123",
        "full_name": "Test User Vokasi",
        "role": "user",
    }

    reg_res = client.post("/api/v1/auth/register", json=register_payload)
    assert reg_res.status_code == 201
    reg_data = reg_res.json()
    assert reg_data["user"]["email"] == unique_email
    assert "access_token" in reg_data["token"]
    token = reg_data["token"]["access_token"]

    me_res = client.get(
        "/api/v1/auth/me",
        headers={"Authorization": f"Bearer {token}"},
    )
    assert me_res.status_code == 200
    me_data = me_res.json()
    assert me_data["email"] == unique_email

    dup_res = client.post("/api/v1/auth/register", json=register_payload)
    assert dup_res.status_code == 409

    login_res = client.post(
        "/api/v1/auth/login",
        json={"email": unique_email, "password": "securepassword123"},
    )
    assert login_res.status_code == 200
    assert "access_token" in login_res.json()["token"]

    bad_login_res = client.post(
        "/api/v1/auth/login",
        json={"email": unique_email, "password": "wrongpassword"},
    )
    assert bad_login_res.status_code == 401


def test_protected_routes_without_token_must_fail_401():
    pathway_payload = {
        "student_name": "Anon Siswa",
        "vocational_major": "RPL",
        "current_skills": ["Python"],
        "target_industry": "Green Web",
    }
    res = client.post("/api/v1/agent/generate-pathway", json=pathway_payload)
    assert res.status_code == 401

    random_id = str(uuid.uuid4())
    res_roadmap = client.get(f"/api/v1/roadmaps/{random_id}")
    assert res_roadmap.status_code == 401

    res_task = client.patch(f"/api/v1/tasks/{random_id}/toggle")
    assert res_task.status_code == 401


def test_authenticated_pathway_generation_and_checklist():
    unique_email = f"student_{uuid.uuid4().hex[:8]}@gridskill.id"
    reg_payload = {
        "email": unique_email,
        "password": "password123",
        "full_name": "Ahmad Dani",
        "role": "user",
    }
    reg_res = client.post("/api/v1/auth/register", json=reg_payload)
    token = reg_res.json()["token"]["access_token"]
    auth_headers = {"Authorization": f"Bearer {token}"}

    pathway_payload = {
        "student_name": "Ahmad Dani",
        "vocational_major": "SIJA",
        "current_skills": ["Networking", "Basic Linux", "IoT Arduino"],
        "target_industry": "Smart Energy & Green Data Center",
    }

    post_res = client.post(
        "/api/v1/agent/generate-pathway",
        json=pathway_payload,
        headers=auth_headers,
    )
    assert post_res.status_code == 201
    res_data = post_res.json()
    assert res_data["status"] == "success"

    profile = res_data["profile"]
    roadmap = res_data["roadmap"]
    tasks = res_data["tasks"]

    assert profile["student_name"] == pathway_payload["student_name"]
    assert profile["user_id"] is not None
    assert len(roadmap["skill_gap_summary"]) >= 1
    assert len(tasks) >= 3

    profile_id = profile["id"]
    task_id = tasks[0]["id"]

    get_res = client.get(
        f"/api/v1/roadmaps/{profile_id}",
        headers=auth_headers,
    )
    assert get_res.status_code == 200
    roadmap_data = get_res.json()
    assert roadmap_data["profile_id"] == profile_id
    assert len(roadmap_data["tasks"]) == len(tasks)

    patch_res = client.patch(
        f"/api/v1/tasks/{task_id}/toggle",
        headers=auth_headers,
    )
    assert patch_res.status_code == 200
    toggle_data = patch_res.json()
    assert toggle_data["id"] == task_id
    assert toggle_data["is_completed"] is True
