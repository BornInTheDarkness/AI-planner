# Architecture Decision Records

ADR фиксирует одно существенное решение, рассмотренные альтернативы, последствия
и условие пересмотра. Статусы: `Proposed`, `Accepted`, `Superseded`, `Rejected`.

| ADR                                  | Решение                             | Статус   |
| ------------------------------------ | ----------------------------------- | -------- |
| [ADR-001](0001-modular-monolith.md)  | Модульный монолит и workers         | Proposed |
| [ADR-002](0002-spatial-contract.md)  | Метрическая версионированная модель | Proposed |
| [ADR-003](0003-persistence.md)       | PostgreSQL/PostGIS и object storage | Proposed |
| [ADR-004](0004-background-jobs.md)   | Идемпотентные фоновые jobs          | Proposed |
| [ADR-005](0005-ai-gateway.md)        | AI Gateway и provenance             | Proposed |
| [ADR-006](0006-application-stack.md) | Next.js/TypeScript и FastAPI/Python | Proposed |

Решение становится `Accepted` только после указания даты и ответственного. До
этого реализация на ветке рассматривается как проверяемый технический baseline.
