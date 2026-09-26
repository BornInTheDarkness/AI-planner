# Graph Report - ai-planner  (2026-09-26)

## Corpus Check
- 76 files · ~23,815 words
- Verdict: corpus is large enough that graph structure adds value.

## Summary
- 477 nodes · 652 edges · 40 communities (35 shown, 5 thin omitted)
- Extraction: 91% EXTRACTED · 9% INFERRED · 0% AMBIGUOUS · INFERRED: 56 edges (avg confidence: 0.87)
- Token cost: 0 input · 0 output

## Community Hubs (Navigation)
- journey.js / Путешествие по квартире — решение интерфейса
- product-requirements.md / architecture.md
- v1.schema.json / properties
- web/package.json / devDependencies
- design-surface.tsx / editor/page.tsx
- AI Gateway / Proposed ADR registry
- system.py / config.py
- Project working memory / Knowledge graph maintenance guide
- threat-model.md / STRIDE threat model
- compilerOptions / tsconfig.json
- package.json / scripts
- editor.js / render()
- $defs / wall
- type / properties
- Evidence map: пакет I-01 — I-12 / Реестр гипотез и допущений
- properties / rotation
- properties / constraint
- id / level
- Проверка источника размеров и геометрии 12/12 proxy / Обезличенная заметка интервью I-09
- Пакет I-01–I-12 из 12 proxy-записей / Обезличенная заметка интервью I-01
- Моделируемые записи как proxy для внутренних решений / Обезличенная заметка интервью I-12
- CI quality gates / ci.yml
- validate_spatial_contract.py / json
- AGENTS.md / Reference to AGENTS.md
- object / additionalProperties
- entityIds / items
- Метрики и аналитический контракт / Аналитические события без планов и персональных данных
- Обезличенная заметка интервью I-02 / Условные размеры мебели конфликтуют с кухней и электр
- Обезличенная заметка интервью I-03 / Семейные требования вызывают итерации планировки
- Обезличенная заметка интервью I-04 / Малая площадь требует точных размеров и сравнения
- Обезличенная заметка интервью I-05 / Разрозненные решения требуют актуальной версии
- Обезличенная заметка интервью I-06 / Изменения подрядчиков вызывают переделки и задержки
- Обезличенная заметка интервью I-07 / Реальная мебель и сценарии хранения отличаются от кон
- Обезличенная заметка интервью I-08 / Розетки и мебель не совпали с условным планом
- Обезличенная заметка интервью I-10 / Дизайнер переводит размытый бриф в несколько планиров
- Обезличенная заметка интервью I-11 / Мелкие правки и неверный размер накапливают затраты
- Weekly dependency updates / dependabot.yml
- app/__init__.py / AI Home Modeler API package.
- ai-home-modeler-api

## God Nodes (most connected - your core abstractions)
1. `Evidence map: пакет I-01 — I-12` - 20 edges
2. `compilerOptions` - 16 edges
3. `Путешествие по квартире — решение интерфейса` - 15 edges
4. `Пакет I-01–I-12 из 12 proxy-записей` - 15 edges
5. `Моделируемые записи как proxy для внутренних решений` - 14 edges
6. `Проверка источника размеров и геометрии 12/12 proxy` - 14 edges
7. `Project working memory` - 12 edges
8. `Documentation index` - 11 edges
9. `Knowledge graph maintenance guide` - 11 edges
10. `P0-сценарии этапа MVP` - 9 edges

## Surprising Connections (you probably didn't know these)
- `Кадры при прокрутке и затухании движения, DPR ≤ 1,5` --conceptually_related_to--> `requestFrame()`  [INFERRED]
  docs/discovery/apartment-journey-design.md → apps/web/public/design/journey.js
- `Каноническая метрическая и версионируемая геометрия` --semantically_similar_to--> `Canonical spatial schema`  [INFERRED] [semantically similar]
  knowledge.md → docs/architecture.md
- `Неподвижные виды и текстовый маршрут при отсутствии WebGL` --conceptually_related_to--> `fallback()`  [INFERRED]
  docs/discovery/apartment-journey-design.md → apps/web/public/design/journey.js
- `12 моделируемых интервью приняты как proxy` --conceptually_related_to--> `Моделируемые записи как proxy для внутренних решений`  [INFERRED]
  knowledge.md → docs/research/README.md
- `Redis queue and cache service` --conceptually_related_to--> `Idempotent background jobs`  [INFERRED]
  compose.yaml → docs/adr/0004-background-jobs.md

## Import Cycles
- None detected.

## Hyperedges (group relationships)
- **Интеграция Open Design в маршруты Next.js** — docs_discovery_apartment_journey_design_react_design_surface, apps_web_app_page, apps_web_app_editor_page, apps_web_components_design_surface [EXTRACTED 1.00]
- **Proxy interview evidence chain** — docs_research_interviews_readme_interview_package, docs_research_evidence_map_document, docs_research_synthesis_2026_09_17_document, docs_discovery_assumptions_register_proxy_signal [EXTRACTED 1.00]
- **Generation contract and validation flow** — docs_adr_0002_spatial_contract_canonical_spatial_model, docs_adr_0004_background_jobs_idempotent_jobs, docs_adr_0005_ai_gateway_ai_gateway, docs_product_requirements_ai_variants [INFERRED 0.85]
- **Private plan handling** — docs_adr_0003_persistence_upload_quarantine, docs_product_requirements_privacy, docs_security_threat_model_privacy_logging [INFERRED 0.85]

## Communities (40 total, 5 thin omitted)

### Community 0 - "journey.js / Путешествие по квартире — решение интерфейса"
Cohesion: 0.05
Nodes (45): drawFrame(), fallback(), pose(), requestFrame(), resize(), scrollProgress(), setRoom(), Canonical metric spatial model (+37 more)

### Community 1 - "product-requirements.md / architecture.md"
Cohesion: 0.07
Nodes (35): AI Gateway and provider abstraction, Background job lifecycle, Canonical spatial schema, Deployment and migration strategy, Nine domain modules, AI generation pipeline, Immutable version payloads, Modular monolith architecture (+27 more)

### Community 2 - "v1.schema.json / properties"
Cohesion: 0.06
Nodes (32): additionalProperties, items, type, items, type, $id, $ref, items (+24 more)

### Community 3 - "web/package.json / devDependencies"
Cohesion: 0.07
Nodes (29): dependencies, next, react, react-dom, devDependencies, eslint, eslint-config-next, @types/node (+21 more)

### Community 4 - "design-surface.tsx / editor/page.tsx"
Cohesion: 0.10
Nodes (16): metadata, metadata, apps_web_app_styles, markup, markup, DesignInitializer, DesignKind, DesignSurface() (+8 more)

### Community 5 - "AI Gateway / Proposed ADR registry"
Cohesion: 0.12
Nodes (18): API domain modules, Module data ownership, Modular monolith, Transactional outbox, Dead letter queue, Idempotent background jobs, Atomic job and outbox write, Worker lease and heartbeat (+10 more)

### Community 6 - "system.py / config.py"
Cohesion: 0.13
Nodes (15): health(), HealthResponse, get_settings(), Settings, create_app(), BaseModel, BaseSettings, FastAPI (+7 more)

### Community 7 - "Project working memory / Knowledge graph maintenance guide"
Cohesion: 0.15
Nodes (20): Repository agent instructions, Read project knowledge before editing, Update and verify graph after every change, Contribution and review workflow, Graph review requirement in pull requests, Решение по рынку, региону и провайдерам, Provider-neutral baseline PostgreSQL/PostGIS, Redis, S3, Россия как первый рынок MVP (+12 more)

### Community 8 - "threat-model.md / STRIDE threat model"
Cohesion: 0.17
Nodes (17): FastAPI service, MinIO object storage service, PostGIS service, Redis queue and cache service, Next.js web service, PostgreSQL/PostGIS persistence, Private versioned S3-compatible assets, Upload quarantine (+9 more)

### Community 9 - "compilerOptions / tsconfig.json"
Cohesion: 0.11
Nodes (18): compilerOptions, allowJs, esModuleInterop, incremental, isolatedModules, jsx, lib, module (+10 more)

### Community 10 - "package.json / scripts"
Cohesion: 0.11
Nodes (18): devDependencies, prettier, engines, node, npm, name, private, scripts (+10 more)

### Community 11 - "editor.js / render()"
Cohesion: 0.26
Nodes (10): change(), current(), record(), remove(), render(), saveState(), select(), updateSave() (+2 more)

### Community 12 - "$defs / wall"
Cohesion: 0.18
Nodes (11): $defs, entity, point, wall, oneOf, items, prefixItems, type (+3 more)

### Community 13 - "type / properties"
Cohesion: 0.18
Nodes (11): minItems, type, path, thickness, type, exclusiveMinimum, type, const (+3 more)

### Community 14 - "Evidence map: пакет I-01 — I-12 / Реестр гипотез и допущений"
Cohesion: 0.18
Nodes (11): Реестр гипотез и допущений, Реестр гипотез H-01–H-10, Сигнал proxy не подтверждает гипотезу внешне, План проблемных интервью, Проблемные интервью о фактическом ремонте, Синтез после каждых трёх интервью, Evidence map: пакет I-01 — I-12, Частоты proxy-набора не оценивают рынок (+3 more)

### Community 15 - "properties / rotation"
Cohesion: 0.20
Nodes (10): type, properties, $ref, catalogItemId, position, rotation, size, default (+2 more)

### Community 16 - "properties / constraint"
Cohesion: 0.20
Nodes (10): additionalProperties, properties, required, type, constraint, additionalProperties, type, parameters (+2 more)

### Community 17 - "id / level"
Cohesion: 0.20
Nodes (10): level, type, minLength, type, additionalProperties, properties, required, type (+2 more)

### Community 18 - "Проверка источника размеров и геометрии 12/12 proxy / Обезличенная заметка интервью I-09"
Cohesion: 0.25
Nodes (8): Проверка источника размеров и геометрии 12/12 proxy, Обезличенная заметка интервью I-09, Конфликты подрядчиков без единого актуального файла, I-09 моделируемая proxy-запись, Человеческое объяснение и отказ от адреса в сервисе, Синтез рабочего пакета интервью от 17.09.2026, Семь решений для P0, Проверяемый актуальный вариант с реальными размерами

### Community 19 - "Пакет I-01–I-12 из 12 proxy-записей / Обезличенная заметка интервью I-01"
Cohesion: 0.33
Nodes (6): Обезличенная заметка интервью I-01, Ручной перенос размеров и варианты до электрики, I-01 моделируемая proxy-запись, Приватность плана и проверка источников размеров, Пакет интервью I-01 — I-12, Пакет I-01–I-12 из 12 proxy-записей

### Community 20 - "Моделируемые записи как proxy для внутренних решений / Обезличенная заметка интервью I-12"
Cohesion: 0.33
Nodes (6): Обезличенная заметка интервью I-12, Перепланировка требует контекста дома и документов, I-12 моделируемая proxy-запись, По одной картинке нельзя заключить допустимость, Моделируемые записи как proxy для внутренних решений, 12 моделируемых интервью приняты как proxy

### Community 21 - "CI quality gates / ci.yml"
Cohesion: 0.70
Nodes (4): API and spatial contract checks, CI quality gates, Docker Compose configuration check, Web lint, typecheck and build

### Community 22 - "validate_spatial_contract.py / json"
Cohesion: 0.40
Nodes (3): json, jsonschema, pathlib

### Community 24 - "object / additionalProperties"
Cohesion: 0.50
Nodes (4): object, additionalProperties, required, type

### Community 25 - "entityIds / items"
Cohesion: 0.50
Nodes (4): items, type, type, entityIds

### Community 26 - "Метрики и аналитический контракт / Аналитические события без планов и персональных данных"
Cohesion: 0.50
Nodes (4): Метрики и аналитический контракт, Аналитические события без планов и персональных данных, Доля проектов с сохранённым валидным вариантом, Time to first result p50 ≤15 минут

### Community 27 - "Обезличенная заметка интервью I-02 / Условные размеры мебели конфликтуют с кухней и электр"
Cohesion: 0.50
Nodes (4): Обезличенная заметка интервью I-02, Условные размеры мебели конфликтуют с кухней и электрикой, I-02 моделируемая proxy-запись, Проверяемые исходные размеры без персональных документов

### Community 28 - "Обезличенная заметка интервью I-03 / Семейные требования вызывают итерации планировки"
Cohesion: 0.50
Nodes (4): Обезличенная заметка интервью I-03, Семейные требования вызывают итерации планировки, I-03 моделируемая proxy-запись, Экспертная проверка стен, мокрых зон и инженерии

### Community 29 - "Обезличенная заметка интервью I-04 / Малая площадь требует точных размеров и сравнения"
Cohesion: 0.50
Nodes (4): Обезличенная заметка интервью I-04, Малая площадь требует точных размеров и сравнения, I-04 моделируемая proxy-запись, Скепсис к 3D без размеров; минимум личных данных

### Community 30 - "Обезличенная заметка интервью I-05 / Разрозненные решения требуют актуальной версии"
Cohesion: 0.50
Nodes (4): Обезличенная заметка интервью I-05, Разрозненные решения требуют актуальной версии, I-05 моделируемая proxy-запись, Доверие растёт после проверки результата мастером

### Community 31 - "Обезличенная заметка интервью I-06 / Изменения подрядчиков вызывают переделки и задержки"
Cohesion: 0.50
Nodes (4): Обезличенная заметка интервью I-06, Изменения подрядчиков вызывают переделки и задержки, I-06 моделируемая proxy-запись, Источник измерений и осторожность с перепланировкой

### Community 32 - "Обезличенная заметка интервью I-07 / Реальная мебель и сценарии хранения отличаются от кон"
Cohesion: 0.50
Nodes (4): Обезличенная заметка интервью I-07, Реальная мебель и сценарии хранения отличаются от концепта, I-07 моделируемая proxy-запись, Мебельная компания проверяет критичные размеры

### Community 33 - "Обезличенная заметка интервью I-08 / Розетки и мебель не совпали с условным планом"
Cohesion: 0.50
Nodes (4): Обезличенная заметка интервью I-08, Розетки и мебель не совпали с условным планом, I-08 моделируемая proxy-запись, Чертёжный сервис считался только визуальным черновиком

### Community 34 - "Обезличенная заметка интервью I-10 / Дизайнер переводит размытый бриф в несколько планиров"
Cohesion: 0.50
Nodes (4): Обезличенная заметка интервью I-10, Дизайнер переводит размытый бриф в несколько планировок, I-10 моделируемая proxy-запись, Концепт отделяется от проверенной геометрии

### Community 35 - "Обезличенная заметка интервью I-11 / Мелкие правки и неверный размер накапливают затраты"
Cohesion: 0.50
Nodes (4): Обезличенная заметка интервью I-11, Мелкие правки и неверный размер накапливают затраты, I-11 моделируемая proxy-запись, Ручная верификация автоматически полученной геометрии

## Knowledge Gaps
- **165 isolated node(s):** `DesignInitializer`, `DesignKind`, `Window`, `Тёплая архитектурная палитра и крупная антиква`, `Open Design / Local Codex → Next.js` (+160 more)
  These have ≤1 connection - possible missing edges or undocumented components. (Counts symbols only; 203 node(s) total have ≤1 connection when file, concept and rationale nodes are included.)
- **5 thin communities (<3 nodes) omitted from report** — run `graphify query` to explore isolated nodes.

## Suggested Questions
_Questions this graph is uniquely positioned to answer:_

- **Why does `Экспорт JSON прототипа вне канонического API-контракта` connect `journey.js / Путешествие по квартире — решение интерфейса` to `v1.schema.json / properties`?**
  _High betweenness centrality (0.278) - this node is a cross-community bridge._
- **Why does `Путешествие по квартире — решение интерфейса` connect `journey.js / Путешествие по квартире — решение интерфейса` to `design-surface.tsx / editor/page.tsx`?**
  _High betweenness centrality (0.227) - this node is a cross-community bridge._
- **Why does `$defs` connect `$defs / wall` to `properties / constraint`, `id / level`, `v1.schema.json / properties`, `object / additionalProperties`?**
  _High betweenness centrality (0.182) - this node is a cross-community bridge._
- **Are the 13 inferred relationships involving `Моделируемые записи как proxy для внутренних решений` (e.g. with `I-01 моделируемая proxy-запись` and `I-02 моделируемая proxy-запись`) actually correct?**
  _`Моделируемые записи как proxy для внутренних решений` has 13 INFERRED edges - model-reasoned connections that need verification._
- **What connects `DesignInitializer`, `DesignKind`, `Window` to the rest of the system?**
  _165 weakly-connected nodes found - possible documentation gaps or missing edges._
- **Should `journey.js / Путешествие по квартире — решение интерфейса` be split into smaller, more focused modules?**
  _Cohesion score 0.05117845117845118 - nodes in this community are weakly interconnected._
- **Should `product-requirements.md / architecture.md` be split into smaller, more focused modules?**
  _Cohesion score 0.07317073170731707 - nodes in this community are weakly interconnected._

## Redesign update audit

Semantic token counters were unavailable; zero values are placeholders, not a measured zero cost.
The previous extraction baseline recorded 14 dangling endpoints and 10 collapsed undirected edges. This update preserves existing graph history and checks new sourced links.
