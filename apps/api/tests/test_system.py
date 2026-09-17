from app.main import app
from fastapi.testclient import TestClient


def test_health_describes_running_service() -> None:
    response = TestClient(app).get("/api/v1/health")

    assert response.status_code == 200
    assert response.json() == {
        "status": "ok",
        "service": "api",
        "version": "0.1.0",
        "environment": "local",
    }


def test_openapi_exposes_versioned_health_contract() -> None:
    document = TestClient(app).get("/api/openapi.json").json()

    assert "/api/v1/health" in document["paths"]
    assert document["info"]["title"] == "AI Home Modeler API"
