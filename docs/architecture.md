# Архитектура AI Home Modeler

## 1. Принципы

- **Модульный монолит сначала:** быстрее изменять доменную модель; тяжёлые workers отделены.
- **API-first и versioned contracts:** web-клиент, workers и будущие приложения используют контракты.
- **Асинхронность для тяжёлых задач:** импорт, AI, рендер и экспорт выполняются как jobs.
- **Проверяемый AI:** вероятностная генерация отделена от детерминированной валидации.
- **Privacy/security by design:** минимизация данных, изоляция проектов, аудит и retention.
- **Provider abstraction:** провайдер модели и рендера заменяем без изменения домена.

## 2. Контейнеры

| Компонент | Ответственность | Предлагаемый стек |
|---|---|---|
| Web App | кабинет, 2D-редактор, сравнение, экспорт | Next.js/TypeScript, React, Canvas/WebGL |
| Backend API | authz, проекты, версии, каталог, jobs, биллинг | Python 3.12, FastAPI, Pydantic |
| Worker | импорт, генерация, валидация, рендер, экспорт | Python, Celery/Dramatiq |
| PostgreSQL | транзакционные и геометрические данные | PostgreSQL + PostGIS |
| Object Storage | исходники, previews, exports | S3-compatible, versioning, lifecycle |
| Queue/Cache | задания, блокировки, кэш, rate limits | Redis на MVP; managed queue позднее |
| AI Gateway | адаптеры моделей, policy, usage/cost | внутренний модуль/сервис |
| Observability | traces, metrics, logs, errors | OpenTelemetry + managed backend |

Выбор конкретных облачных сервисов откладывается до определения региона и
ограничений по данным.

## 3. Доменные модули

1. **Identity & Access** — пользователи, сессии, membership, роли.
2. **Projects** — проект, бриф, статус, политика удаления.
3. **Spatial Model** — комнаты, стены, проёмы, зоны, объекты, ограничения.
4. **Ingestion** — uploads, нормализация, OCR/CV и калибровка.
5. **Generation** — запрос, варианты, scoring, provenance.
6. **Catalog & Estimate** — товары, цены, соответствие и смета.
7. **Rendering & Export** — виды, отчёты и артефакты.
8. **Usage & Billing** — квоты, usage ledger и подписки.
9. **Administration** — контент, flags, аудит и support tools.

Модули взаимодействуют через application services и доменные события. Прямой
доступ одного модуля к таблицам другого запрещён, даже пока они находятся в
одной БД.

## 4. Модель данных (ядро)

```text
User ──< ProjectMember >── Project ──< BriefVersion
                              │
                              ├──< SourceAsset
                              ├──< SpatialModelVersion ──< SpatialEntity
                              │          │
                              │          └──< Constraint
                              ├──< GenerationJob ──< DesignVariant
                              │                              │
                              ├──< RenderJob ────────────────┘
                              ├──< EstimateVersion ──< EstimateItem >── CatalogItem
                              └──< ExportArtifact
```

Каждая изменяемая модель использует immutable version payload (JSONB на MVP) с
нормализованными индексируемыми полями. Запись проекта содержит указатель на
активную версию. Оптимистическая блокировка (`expected_version`) предотвращает
тихую потерю изменений.

## 5. Каноническая пространственная схема

```json
{
  "schemaVersion": "1.0",
  "units": "m",
  "origin": [0, 0],
  "levels": [{
    "id": "level_1",
    "elevation": 0,
    "entities": [
      {"id": "wall_1", "type": "wall", "path": [[0, 0], [4.2, 0]], "thickness": 0.18}
    ]
  }],
  "constraints": [],
  "metadata": {"sourceVersionId": "..."}
}
```

JSON Schema хранится и версионируется в коде. Миграции между версиями схемы
явные и обратимо тестируются на golden fixtures.

## 6. API и задания

REST API `/api/v1`:

- `POST /projects`, `GET/PATCH/DELETE /projects/{id}`;
- `POST /projects/{id}/uploads:init`, `POST .../uploads:complete`;
- `GET/PUT /projects/{id}/spatial-model` с `If-Match`;
- `POST /projects/{id}/generation-jobs`, `GET/DELETE /jobs/{id}`;
- `GET /projects/{id}/variants`, `POST /variants/{id}:select`;
- `POST /variants/{id}/render-jobs`;
- `GET /projects/{id}/estimate`, `POST /projects/{id}/exports`.

Общие правила: UUID/ULID identifiers, UTC ISO-8601, problem-details ошибки,
cursor pagination, request/trace ID, idempotency key для создающих команд.
Прогресс MVP доставляется polling; после подтверждения нагрузки — SSE.

Состояния job: `queued → running → succeeded|failed|cancelled`. Worker берёт lease,
пишет heartbeat и публикует результат атомарно. Повтор не создаёт второй итоговый
артефакт благодаря idempotency key. Исчерпанные retries уходят в DLQ.

## 7. AI-контур

Пайплайн генерации:

1. Очистить и нормализовать пользовательский ввод.
2. Собрать минимальный контекст из конкретной версии проекта.
3. Вызвать provider adapter с лимитом токенов/стоимости и deadline.
4. Проверить ответ по строгой схеме.
5. Выполнить геометрические и бизнес-валидаторы.
6. Оценить соответствие брифу, разнообразие и ограничения.
7. Сохранить provenance и опубликовать только прошедшие варианты.

Prompt injection из загруженных документов считается недоверенным вводом.
Моделям не выдаются секреты, произвольный сетевой доступ или права записи в БД.
Для каждой версии prompt/model ведётся offline evaluation: schema validity,
collision rate, constraint satisfaction, diversity и экспертная оценка.

## 8. Безопасность

- OIDC/OAuth2; secure HttpOnly cookies для web; MFA для администраторов.
- Проверка membership/role на каждом объектном запросе, а не только в UI.
- Presigned uploads с ограничениями; quarantine и malware scan перед обработкой.
- TLS, managed KMS, rotation секретов, отдельные service identities.
- CSP, CSRF-защита, rate limits, audit trail привилегированных действий.
- Tenant/project ID присутствует во всех запросах; тесты на IDOR обязательны.
- Backup + point-in-time recovery; квартальное упражнение восстановления.
- SBOM, dependency scanning, secret scanning и подписанные production images.

До публичного запуска необходимы threat model и review применимого законодательства.

## 9. Развёртывание

Среды: local, preview на pull request, staging и production. Артефакт собирается
один раз и продвигается между средами. Infrastructure as Code описывает сеть,
БД, storage, queue, KMS и observability. Миграции БД обратно совместимы по схеме
expand/migrate/contract; откат приложения не должен требовать отката данных.

CI: format/lint → unit → contract/schema → integration → SAST/dependency scan →
build image → preview/e2e. Production использует manual approval, canary и
автоматический rollback по error rate/latency.

## 10. Наблюдаемость и SLO

Основные сигналы: API traffic/errors/latency/saturation, глубина и возраст очереди,
job success/duration/retry, AI latency/cost/schema-validity, storage/DB health.
Логи структурированы и связаны `trace_id`, `project_id`, `job_id`, но исключают
содержимое планов и prompts. Алерты привязаны к пользовательскому ущербу и runbook.

## 11. Тестовая стратегия

- unit: доменные правила, геометрия, калькуляция;
- property-based: пространственные операции и сериализация;
- contract: OpenAPI, JSON Schema, provider adapters;
- integration: PostgreSQL, storage, queue, job idempotency;
- golden datasets: импорт планов и AI-evaluation;
- e2e: P0-пути создания, генерации, редактирования и экспорта;
- security: authz matrix, IDOR, upload abuse, rate limits;
- load/soak: API, burst jobs, деградация внешних AI API;
- recovery: restore backup и повтор незавершённых jobs.

## 12. Эволюция

Выделять сервис только при измеримой причине: независимое масштабирование,
изоляция отказов, отдельная команда или требования безопасности. Первые кандидаты:
rendering, ingestion и AI orchestration. События через transactional outbox позволят
сделать это без dual-write.
