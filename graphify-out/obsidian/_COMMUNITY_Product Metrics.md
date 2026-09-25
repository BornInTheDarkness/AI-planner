---
type: community
cohesion: 0.50
members: 4
---

# Product Metrics

**Cohesion:** 0.50 - moderately connected
**Members:** 4 nodes

## Members
- [[Time to first result p50 ≤15 минут]] - concept - docs/discovery/metrics.md
- [[Аналитические события без планов и персональных данных]] - concept - docs/discovery/metrics.md
- [[Доля проектов с сохранённым валидным вариантом]] - concept - docs/discovery/metrics.md
- [[Метрики и аналитический контракт]] - document - docs/discovery/metrics.md

## Live Query (requires Dataview plugin)

```dataview
TABLE source_file, type FROM #community/Product_Metrics
SORT file.name ASC
```
