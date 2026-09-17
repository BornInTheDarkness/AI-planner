# ADR-003: PostgreSQL/PostGIS и S3-совместимое хранилище

- **Статус:** Proposed
- **Дата предложения:** 2026-09-17
- **Владелец:** требуется назначить

## Контекст

Метаданные и версии требуют транзакций; планы, previews и exports велики и имеют
отдельный жизненный цикл. Пространственные проверки могут потребовать индексов.

## Решение

Использовать PostgreSQL/PostGIS для транзакционных и индексируемых данных. Binary
assets хранить в private S3-compatible buckets с versioning, lifecycle и presigned
operations. В БД хранить owner, digest, MIME, size, state и object key.

## Последствия

Удаление и backup охватывают две системы и требуют согласованного workflow.
Upload сначала попадает в quarantine. Локально используются PostGIS и MinIO;
production-провайдер определяется после решения по data residency.

## Пересмотр

При доказанной потребности в специализированном geometry store либо иной модели
регионального хранения.
