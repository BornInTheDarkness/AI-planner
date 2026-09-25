---
type: community
cohesion: 0.13
members: 23
---

# API Health and Settings

**Cohesion:** 0.13 - loosely connected
**Members:** 23 nodes

## Members
- [[BaseModel]] - code
- [[BaseSettings]] - code
- [[FastAPI]] - code
- [[HealthResponse]] - code - apps/api/app/api/routes/system.py
- [[Settings]] - code - apps/api/app/config.py
- [[config.py]] - code - apps/api/app/config.py
- [[create_app()]] - code - apps/api/app/main.py
- [[fastapi_middleware_cors]] - concept
- [[fastapi_testclient]] - concept
- [[functools]] - concept
- [[get]] - code
- [[get_settings()]] - code - apps/api/app/config.py
- [[health()]] - code - apps/api/app/api/routes/system.py
- [[main.py]] - code - apps/api/app/main.py
- [[pydantic]] - concept
- [[pydantic_settings]] - concept
- [[router.py]] - code - apps/api/app/api/router.py
- [[routes__init__.py]] - code - apps/api/app/api/routes/__init__.py
- [[system.py]] - code - apps/api/app/api/routes/system.py
- [[test_health_describes_running_service()]] - code - apps/api/tests/test_system.py
- [[test_openapi_exposes_versioned_health_contract()]] - code - apps/api/tests/test_system.py
- [[test_system.py]] - code - apps/api/tests/test_system.py
- [[typing]] - concept

## Live Query (requires Dataview plugin)

```dataview
TABLE source_file, type FROM #community/API_Health_and_Settings
SORT file.name ASC
```
