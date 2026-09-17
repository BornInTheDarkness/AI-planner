# Доменные модули API

В этом каталоге будут размещаться модули `identity`, `projects`, `spatial`,
`ingestion`, `generation`, `catalog`, `rendering`, `usage` и `administration`.

Каждый модуль владеет своими моделями, репозиториями и application services.
Импортировать репозиторий или ORM-модель другого модуля запрещено. Связь между
модулями выполняется через публичный application service или доменное событие.
