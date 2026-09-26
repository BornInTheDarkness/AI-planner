---
type: community
members: 25
---

# AI Gateway / Proposed ADR registry

**Members:** 25 nodes

## Members
- [[0001-modular-monolith]] - document - docs/adr/0001-modular-monolith.md
- [[0004-background-jobs]] - document - docs/adr/0004-background-jobs.md
- [[0005-ai-gateway]] - document - docs/adr/0005-ai-gateway.md
- [[0006-application-stack]] - document - docs/adr/0006-application-stack.md
- [[AI Gateway]] - rationale - docs/adr/0005-ai-gateway.md
- [[AI provenance]] - concept - docs/adr/0005-ai-gateway.md
- [[API domain modules]] - concept - apps/api/app/modules/README.md
- [[Atomic job and outbox write]] - concept - docs/adr/0004-background-jobs.md
- [[Dead letter queue]] - concept - docs/adr/0004-background-jobs.md
- [[Deterministic validation after AI]] - concept - docs/adr/0005-ai-gateway.md
- [[Generation job sequence]] - concept - docs/diagrams/system-context.md
- [[Idempotent background jobs]] - rationale - docs/adr/0004-background-jobs.md
- [[Modular monolith]] - rationale - docs/adr/0001-modular-monolith.md
- [[Module data ownership]] - rationale - apps/api/app/modules/README.md
- [[Next.js and FastAPI stack]] - rationale - docs/adr/0006-application-stack.md
- [[OpenAPI and JSON Schema boundary]] - concept - docs/adr/0006-application-stack.md
- [[Proposed ADR registry]] - concept - docs/adr/README.md
- [[Provider adapters]] - concept - docs/adr/0005-ai-gateway.md
- [[Six proposed architecture decisions]] - concept - docs/decisions.md
- [[System context flow]] - concept - docs/diagrams/system-context.md
- [[Transactional outbox]] - concept - docs/adr/0001-modular-monolith.md
- [[Worker lease and heartbeat]] - concept - docs/adr/0004-background-jobs.md
- [[adrREADME]] - document - docs/adr/README.md
- [[modulesREADME]] - document - apps/api/app/modules/README.md
- [[system-context]] - document - docs/diagrams/system-context.md

## Live Query (requires Dataview plugin)

```dataview
TABLE source_file, type FROM #community/AI_Gateway_/_Proposed_ADR_registry
SORT file.name ASC
```

## Connections to other communities
- 6 edges to [[_COMMUNITY_product-requirements.md  architecture]]
- 4 edges to [[_COMMUNITY_threat-model.md  STRIDE threat model]]
- 2 edges to [[_COMMUNITY_journey.js  Путешествие по квартире — решение интерфейса]]

## Top bridge nodes
- [[Six proposed architecture decisions]] - degree 7, connects to 3 communities
- [[Proposed ADR registry]] - degree 7, connects to 2 communities
- [[AI Gateway]] - degree 7, connects to 2 communities
- [[Idempotent background jobs]] - degree 6, connects to 2 communities
- [[Modular monolith]] - degree 4, connects to 1 community