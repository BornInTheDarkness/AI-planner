---
type: community
cohesion: 0.17
members: 20
---

# Services and Security

**Cohesion:** 0.17 - loosely connected
**Members:** 20 nodes

## Members
- [[0003-persistence]] - document - docs/adr/0003-persistence.md
- [[AI cost exhaustion controls]] - concept - docs/security/threat-model.md
- [[Backup and recovery controls]] - concept - docs/security/threat-model.md
- [[Data minimization and deletion]] - concept - docs/product-requirements.md
- [[FastAPI service]] - concept - compose.yaml
- [[IDOR and object authorization]] - concept - docs/security/threat-model.md
- [[Malicious upload controls]] - concept - docs/security/threat-model.md
- [[MinIO object storage service]] - concept - compose.yaml
- [[Next.js web service]] - concept - compose.yaml
- [[No plans or prompts in telemetry]] - concept - docs/security/threat-model.md
- [[PostGIS service]] - concept - compose.yaml
- [[PostgreSQLPostGIS persistence]] - rationale - docs/adr/0003-persistence.md
- [[Private versioned S3-compatible assets]] - rationale - docs/adr/0003-persistence.md
- [[Prompt injection boundary]] - concept - docs/security/threat-model.md
- [[Redis queue and cache service]] - concept - compose.yaml
- [[STRIDE threat model]] - concept - docs/security/threat-model.md
- [[Unsafe AI result controls]] - concept - docs/security/threat-model.md
- [[Upload quarantine]] - concept - docs/adr/0003-persistence.md
- [[compose.yaml]] - document - compose.yaml
- [[threat-model]] - document - docs/security/threat-model.md

## Live Query (requires Dataview plugin)

```dataview
TABLE source_file, type FROM #community/Services_and_Security
SORT file.name ASC
```

## Connections to other communities
- 4 edges to [[_COMMUNITY_Persistence and AI Jobs]]
- 2 edges to [[_COMMUNITY_Architecture and Spatial Contracts]]

## Top bridge nodes
- [[threat-model]] - degree 9, connects to 1 community
- [[0003-persistence]] - degree 5, connects to 1 community
- [[Redis queue and cache service]] - degree 3, connects to 1 community
- [[AI cost exhaustion controls]] - degree 3, connects to 1 community
- [[Data minimization and deletion]] - degree 2, connects to 1 community