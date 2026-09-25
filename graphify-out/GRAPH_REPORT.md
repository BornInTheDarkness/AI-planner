# Graph Report - ai-planner  (2026-09-25)

## Corpus Check
- Corpus is ~19,270 words - fits in a single context window. You may not need a graph.

## Summary
- 418 nodes · 541 edges · 43 communities (38 shown, 5 thin omitted)
- Extraction: 92% EXTRACTED · 8% INFERRED · 0% AMBIGUOUS · INFERRED: 43 edges (avg confidence: 0.86)
- Token cost: unavailable for agent-based semantic extraction (tracker records 0 input · 0 output)

## Community Hubs (Navigation)
- Architecture and Spatial Contracts
- Web App Configuration
- Spatial JSON Schema
- Persistence and AI Jobs
- API Health and Settings
- Services and Security
- Discovery Scenarios and Personas
- TypeScript Compiler Settings
- Web Package Scripts
- Graph Maintenance Workflow
- Research Hypotheses and Synthesis
- Editor Prototype Flow
- Catalog Item Schema
- Constraint Schema Fields
- Level Structure Schema
- Research Provenance
- Entity Point Definitions
- Wall Geometry Schema
- Renovation Evidence Limits
- Continuous Integration Checks
- Spatial Contract Validator
- Web Agent Guidance
- Schema Object Rules
- Wall Object Schema
- Entity Reference Schema
- Path Item Schema
- Identifier Schema Rules
- Market and Provider Choice
- Product Metrics
- Interview I-01
- Interview I-02
- Interview I-03
- Interview I-04
- Interview I-05
- Interview I-06
- Interview I-07
- Interview I-08
- Interview I-09
- Interview I-10
- Dependency Updates
- API Package
- API Project Metadata

## God Nodes (most connected - your core abstractions)
1. `Evidence map: пакет I-01 — I-12` - 20 edges
2. `compilerOptions` - 16 edges
3. `Пакет I-01–I-12 из 12 proxy-записей` - 15 edges
4. `Проверка источника размеров и геометрии 12/12 proxy` - 14 edges
5. `Моделируемые записи как proxy для внутренних решений` - 13 edges
6. `Documentation index` - 11 edges
7. `Knowledge graph maintenance guide` - 11 edges
8. `scripts` - 8 edges
9. `STRIDE threat model` - 8 edges
10. `$defs` - 7 edges

## Surprising Connections (you probably didn't know these)
- `Redis queue and cache service` --conceptually_related_to--> `Idempotent background jobs`  [INFERRED]
  compose.yaml → docs/adr/0004-background-jobs.md
- `Read project knowledge before editing` --references--> `Project working memory`  [EXTRACTED]
  AGENTS.md → knowledge.md
- `Update and verify graph after every change` --references--> `Graph review requirement in pull requests`  [INFERRED]
  AGENTS.md → CONTRIBUTING.md
- `Future-session graph maintenance rule` --references--> `Update and verify graph after every change`  [INFERRED]
  knowledge.md → AGENTS.md
- `Graph review requirement in pull requests` --references--> `Verify new nodes and sourced cross-area relationships`  [INFERRED]
  CONTRIBUTING.md → docs/knowledge-graph.md

## Import Cycles
- None detected.

## Hyperedges (group relationships)
- **Generation contract and validation flow** — docs_adr_0002_spatial_contract_canonical_spatial_model, docs_adr_0004_background_jobs_idempotent_jobs, docs_adr_0005_ai_gateway_ai_gateway, docs_product_requirements_ai_variants [INFERRED 0.85]
- **Proxy interview evidence chain** — docs_research_interviews_readme_interview_package, docs_research_evidence_map_document, docs_research_synthesis_2026_09_17_document, docs_discovery_assumptions_register_proxy_signal [EXTRACTED 1.00]
- **Private plan handling** — docs_adr_0003_persistence_upload_quarantine, docs_product_requirements_privacy, docs_security_threat_model_privacy_logging [INFERRED 0.85]

## Communities (43 total, 5 thin omitted)

### Community 0 - "Architecture and Spatial Contracts"
Cohesion: 0.07
Nodes (38): Canonical metric spatial model, Versioned JSON Schema, AI Gateway and provider abstraction, Background job lifecycle, Canonical spatial schema, Deployment and migration strategy, Nine domain modules, AI generation pipeline (+30 more)

### Community 1 - "Web App Configuration"
Cohesion: 0.05
Nodes (33): metadata, apps_web_app_styles, nextConfig, dependencies, next, react, react-dom, devDependencies (+25 more)

### Community 2 - "Spatial JSON Schema"
Cohesion: 0.07
Nodes (28): additionalProperties, items, type, $id, $ref, items, minItems, type (+20 more)

### Community 3 - "Persistence and AI Jobs"
Cohesion: 0.12
Nodes (18): API domain modules, Module data ownership, Modular monolith, Transactional outbox, Dead letter queue, Idempotent background jobs, Atomic job and outbox write, Worker lease and heartbeat (+10 more)

### Community 4 - "API Health and Settings"
Cohesion: 0.13
Nodes (15): health(), HealthResponse, get_settings(), Settings, create_app(), BaseModel, BaseSettings, FastAPI (+7 more)

### Community 5 - "Services and Security"
Cohesion: 0.17
Nodes (17): FastAPI service, MinIO object storage service, PostGIS service, Redis queue and cache service, Next.js web service, PostgreSQL/PostGIS persistence, Private versioned S3-compatible assets, Upload quarantine (+9 more)

### Community 6 - "Discovery Scenarios and Personas"
Cohesion: 0.12
Nodes (20): P0-сценарии этапа MVP, P0-02 Проверить и исправить геометрию, P0-01 Создать и повторно открыть проект, P0-03 Сформировать и сравнить варианты, P0-04 Сохранить новую версию варианта, P0-05 Визуализация, смета и экспорт одной версии, Дизайнер как вторичный сегмент, Выборка discovery 12–15 участников (+12 more)

### Community 7 - "TypeScript Compiler Settings"
Cohesion: 0.11
Nodes (18): compilerOptions, allowJs, esModuleInterop, incremental, isolatedModules, jsx, lib, module (+10 more)

### Community 8 - "Web Package Scripts"
Cohesion: 0.11
Nodes (18): devDependencies, prettier, engines, node, npm, name, private, scripts (+10 more)

### Community 9 - "Graph Maintenance Workflow"
Cohesion: 0.27
Nodes (13): Repository agent instructions, Read project knowledge before editing, Update and verify graph after every change, Contribution and review workflow, Graph review requirement in pull requests, Baseline graph health findings, Knowledge graph maintenance guide, Obsidian vault refresh (+5 more)

### Community 10 - "Research Hypotheses and Synthesis"
Cohesion: 0.18
Nodes (11): Реестр гипотез и допущений, Реестр гипотез H-01–H-10, Сигнал proxy не подтверждает гипотезу внешне, План проблемных интервью, Проблемные интервью о фактическом ремонте, Синтез после каждых трёх интервью, Evidence map: пакет I-01 — I-12, Частоты proxy-набора не оценивают рынок (+3 more)

### Community 11 - "Editor Prototype Flow"
Cohesion: 0.22
Nodes (6): EditorPrototype(), FurnitureItem, INITIAL_ITEMS, Step, STEPS, react

### Community 12 - "Catalog Item Schema"
Cohesion: 0.20
Nodes (10): type, properties, $ref, catalogItemId, position, rotation, size, default (+2 more)

### Community 13 - "Constraint Schema Fields"
Cohesion: 0.20
Nodes (10): additionalProperties, properties, required, type, constraint, additionalProperties, type, parameters (+2 more)

### Community 14 - "Level Structure Schema"
Cohesion: 0.20
Nodes (10): level, type, items, type, additionalProperties, properties, required, type (+2 more)

### Community 15 - "Research Provenance"
Cohesion: 0.25
Nodes (8): I-01 моделируемая proxy-запись, Обезличенная заметка интервью I-11, Мелкие правки и неверный размер накапливают затраты, I-11 моделируемая proxy-запись, Ручная верификация автоматически полученной геометрии, Требования к фактическому интервью, Исследовательские материалы, Моделируемые записи как proxy для внутренних решений

### Community 16 - "Entity Point Definitions"
Cohesion: 0.29
Nodes (7): $defs, entity, point, oneOf, items, prefixItems, type

### Community 17 - "Wall Geometry Schema"
Cohesion: 0.29
Nodes (7): minLength, type, id, thickness, exclusiveMinimum, type, properties

### Community 18 - "Renovation Evidence Limits"
Cohesion: 0.33
Nodes (6): Обезличенная заметка интервью I-12, Перепланировка требует контекста дома и документов, I-12 моделируемая proxy-запись, По одной картинке нельзя заключить допустимость, Пакет интервью I-01 — I-12, Пакет I-01–I-12 из 12 proxy-записей

### Community 19 - "Continuous Integration Checks"
Cohesion: 0.70
Nodes (4): API and spatial contract checks, CI quality gates, Docker Compose configuration check, Web lint, typecheck and build

### Community 20 - "Spatial Contract Validator"
Cohesion: 0.40
Nodes (3): json, jsonschema, pathlib

### Community 22 - "Schema Object Rules"
Cohesion: 0.50
Nodes (4): object, additionalProperties, required, type

### Community 23 - "Wall Object Schema"
Cohesion: 0.50
Nodes (4): wall, additionalProperties, required, type

### Community 24 - "Entity Reference Schema"
Cohesion: 0.50
Nodes (4): items, type, type, entityIds

### Community 25 - "Path Item Schema"
Cohesion: 0.50
Nodes (4): items, minItems, type, path

### Community 26 - "Identifier Schema Rules"
Cohesion: 0.50
Nodes (4): type, const, minLength, type

### Community 27 - "Market and Provider Choice"
Cohesion: 0.50
Nodes (4): Решение по рынку, региону и провайдерам, Provider-neutral baseline PostgreSQL/PostGIS, Redis, S3, Россия как первый рынок MVP, Проверка cloud и AI/CV провайдера до production

### Community 28 - "Product Metrics"
Cohesion: 0.50
Nodes (4): Метрики и аналитический контракт, Аналитические события без планов и персональных данных, Доля проектов с сохранённым валидным вариантом, Time to first result p50 ≤15 минут

### Community 29 - "Interview I-01"
Cohesion: 0.50
Nodes (4): Проверка источника размеров и геометрии 12/12 proxy, Обезличенная заметка интервью I-01, Ручной перенос размеров и варианты до электрики, Приватность плана и проверка источников размеров

### Community 30 - "Interview I-02"
Cohesion: 0.50
Nodes (4): Обезличенная заметка интервью I-02, Условные размеры мебели конфликтуют с кухней и электрикой, I-02 моделируемая proxy-запись, Проверяемые исходные размеры без персональных документов

### Community 31 - "Interview I-03"
Cohesion: 0.50
Nodes (4): Обезличенная заметка интервью I-03, Семейные требования вызывают итерации планировки, I-03 моделируемая proxy-запись, Экспертная проверка стен, мокрых зон и инженерии

### Community 32 - "Interview I-04"
Cohesion: 0.50
Nodes (4): Обезличенная заметка интервью I-04, Малая площадь требует точных размеров и сравнения, I-04 моделируемая proxy-запись, Скепсис к 3D без размеров; минимум личных данных

### Community 33 - "Interview I-05"
Cohesion: 0.50
Nodes (4): Обезличенная заметка интервью I-05, Разрозненные решения требуют актуальной версии, I-05 моделируемая proxy-запись, Доверие растёт после проверки результата мастером

### Community 34 - "Interview I-06"
Cohesion: 0.50
Nodes (4): Обезличенная заметка интервью I-06, Изменения подрядчиков вызывают переделки и задержки, I-06 моделируемая proxy-запись, Источник измерений и осторожность с перепланировкой

### Community 35 - "Interview I-07"
Cohesion: 0.50
Nodes (4): Обезличенная заметка интервью I-07, Реальная мебель и сценарии хранения отличаются от концепта, I-07 моделируемая proxy-запись, Мебельная компания проверяет критичные размеры

### Community 36 - "Interview I-08"
Cohesion: 0.50
Nodes (4): Обезличенная заметка интервью I-08, Розетки и мебель не совпали с условным планом, I-08 моделируемая proxy-запись, Чертёжный сервис считался только визуальным черновиком

### Community 37 - "Interview I-09"
Cohesion: 0.50
Nodes (4): Обезличенная заметка интервью I-09, Конфликты подрядчиков без единого актуального файла, I-09 моделируемая proxy-запись, Человеческое объяснение и отказ от адреса в сервисе

### Community 38 - "Interview I-10"
Cohesion: 0.50
Nodes (4): Обезличенная заметка интервью I-10, Дизайнер переводит размытый бриф в несколько планировок, I-10 моделируемая proxy-запись, Концепт отделяется от проверенной геометрии

## Knowledge Gaps
- **164 isolated node(s):** `metadata`, `Step`, `FurnitureItem`, `STEPS`, `INITIAL_ITEMS` (+159 more)
  These have ≤1 connection - possible missing edges or undocumented components. (Counts symbols only; 192 node(s) total have ≤1 connection when file, concept and rationale nodes are included.)
- **5 thin communities (<3 nodes) omitted from report** — run `graphify query` to explore isolated nodes.

## Suggested Questions
_Questions this graph is uniquely positioned to answer:_

- **Why does `Documentation index` connect `Architecture and Spatial Contracts` to `Persistence and AI Jobs`, `Services and Security`, `Discovery Scenarios and Personas`, `Research Provenance`?**
  _High betweenness centrality (0.096) - this node is a cross-community bridge._
- **Why does `Discovery: этап 0` connect `Discovery Scenarios and Personas` to `Architecture and Spatial Contracts`?**
  _High betweenness centrality (0.062) - this node is a cross-community bridge._
- **Why does `Синтез рабочего пакета интервью от 17.09.2026` connect `Discovery Scenarios and Personas` to `Renovation Evidence Limits`?**
  _High betweenness centrality (0.049) - this node is a cross-community bridge._
- **Are the 12 inferred relationships involving `Проверка источника размеров и геометрии 12/12 proxy` (e.g. with `Ручной перенос размеров и варианты до электрики` and `Условные размеры мебели конфликтуют с кухней и электрикой`) actually correct?**
  _`Проверка источника размеров и геометрии 12/12 proxy` has 12 INFERRED edges - model-reasoned connections that need verification._
- **Are the 12 inferred relationships involving `Моделируемые записи как proxy для внутренних решений` (e.g. with `I-01 моделируемая proxy-запись` and `I-02 моделируемая proxy-запись`) actually correct?**
  _`Моделируемые записи как proxy для внутренних решений` has 12 INFERRED edges - model-reasoned connections that need verification._
- **What connects `metadata`, `Step`, `FurnitureItem` to the rest of the system?**
  _164 weakly-connected nodes found - possible documentation gaps or missing edges._
- **Should `Architecture and Spatial Contracts` be split into smaller, more focused modules?**
  _Cohesion score 0.06767676767676768 - nodes in this community are weakly interconnected._