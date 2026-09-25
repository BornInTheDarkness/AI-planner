---
type: community
cohesion: 0.70
members: 5
---

# Continuous Integration Checks

**Cohesion:** 0.70 - tightly connected
**Members:** 5 nodes

## Members
- [[API and spatial contract checks]] - concept - .github/workflows/ci.yml
- [[CI quality gates]] - concept - .github/workflows/ci.yml
- [[Docker Compose configuration check]] - concept - .github/workflows/ci.yml
- [[Web lint, typecheck and build]] - concept - .github/workflows/ci.yml
- [[ci.yml]] - document - .github/workflows/ci.yml

## Live Query (requires Dataview plugin)

```dataview
TABLE source_file, type FROM #community/Continuous_Integration_Checks
SORT file.name ASC
```
