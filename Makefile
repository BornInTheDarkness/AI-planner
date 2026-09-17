.PHONY: bootstrap api web check format infra down

export UV_CACHE_DIR := $(CURDIR)/.uv-cache

bootstrap:
	uv sync
	npm ci

api:
	uv run uvicorn --app-dir apps/api app.main:app --reload --host 0.0.0.0 --port 8000

web:
	npm run dev --workspace @ai-home-modeler/web

check:
	uv run ruff check apps/api scripts
	uv run pytest
	uv run python scripts/validate_spatial_contract.py
	npm run lint --workspace @ai-home-modeler/web
	npm run typecheck --workspace @ai-home-modeler/web

format:
	uv run ruff format apps/api scripts
	npm run format

infra:
	docker compose up -d postgres redis object-storage object-storage-init

down:
	docker compose down
