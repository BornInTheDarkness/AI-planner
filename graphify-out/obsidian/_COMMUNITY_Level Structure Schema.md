---
type: community
cohesion: 0.20
members: 10
---

# Level Structure Schema

**Cohesion:** 0.20 - loosely connected
**Members:** 10 nodes

## Members
- [[additionalProperties_2]] - code - contracts/spatial-model/v1.schema.json
- [[elevation]] - code - contracts/spatial-model/v1.schema.json
- [[entities]] - code - contracts/spatial-model/v1.schema.json
- [[items]] - code - contracts/spatial-model/v1.schema.json
- [[level]] - code - contracts/spatial-model/v1.schema.json
- [[properties_2]] - code - contracts/spatial-model/v1.schema.json
- [[required_1]] - code - contracts/spatial-model/v1.schema.json
- [[type_4]] - code - contracts/spatial-model/v1.schema.json
- [[type_5]] - code - contracts/spatial-model/v1.schema.json
- [[type_6]] - code - contracts/spatial-model/v1.schema.json

## Live Query (requires Dataview plugin)

```dataview
TABLE source_file, type FROM #community/Level_Structure_Schema
SORT file.name ASC
```

## Connections to other communities
- 1 edge to [[_COMMUNITY_Entity Point Definitions]]
- 1 edge to [[_COMMUNITY_Spatial JSON Schema]]
- 1 edge to [[_COMMUNITY_Wall Geometry Schema]]

## Top bridge nodes
- [[level]] - degree 5, connects to 1 community
- [[properties_2]] - degree 4, connects to 1 community
- [[items]] - degree 2, connects to 1 community