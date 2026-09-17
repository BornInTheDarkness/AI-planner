# Threat model MVP

**Статус:** draft для ревью на этапе 0<br>
**Метод:** STRIDE + abuse cases<br>
**Область:** web, API, workers, PostgreSQL/PostGIS, Redis/queue, object storage,
AI/CV-провайдеры и административный интерфейс.

## Активы

1. Учётные данные, сессии и права доступа.
2. Планы жилья, изображения, геометрия, адресные и проектные метаданные.
3. Версии брифа, AI-prompts, варианты и provenance.
4. Каталог, цены, сметы и биллинговые записи.
5. Секреты провайдеров, ключи подписи и service identities.
6. Журналы аудита и telemetry, необходимые для расследования.

Наибольший ущерб связан с раскрытием планов жилья, доступом к чужому проекту,
незаметной подменой геометрии и неконтролируемыми расходами на AI/рендер.

## Участники и границы доверия

- браузер пользователя считается недоверенным;
- публичная сеть между браузером и edge/API;
- API доверяет identity provider только после проверки issuer, audience и подписи;
- API и worker имеют отдельные identities и минимальные права;
- uploads остаются в quarantine до проверки;
- содержимое файлов и текст пользователя недоверенны для AI Gateway;
- внешние AI/CV и каталожные провайдеры находятся за отдельной границей доверия;
- support не имеет доступа к содержимому проекта по умолчанию.

## Основные угрозы и меры

| ID   | STRIDE                 | Сценарий                                   | Риск до мер | Обязательная мера                                                                    | Остаточный риск |
| ---- | ---------------------- | ------------------------------------------ | ----------- | ------------------------------------------------------------------------------------ | --------------- |
| T-01 | Spoofing               | Кража/фиксация сессии                      | Высокий     | OIDC, secure HttpOnly SameSite cookies, rotation, CSRF, короткая сессия для admin    | Средний         |
| T-02 | Elevation              | IDOR даёт доступ к чужому project ID       | Критический | Object-level membership check на каждом запросе, deny by default, authz matrix tests | Низкий          |
| T-03 | Tampering              | Клиент перезаписывает новую версию старой  | Высокий     | `If-Match`, immutable payload, audit, транзакция смены active version                | Низкий          |
| T-04 | Tampering              | Worker повторно публикует результат        | Средний     | Idempotency key, lease, atomic finalize, unique constraint                           | Низкий          |
| T-05 | Information disclosure | План попадает в лог/аналитику              | Критический | Allowlist полей, log redaction, telemetry tests, запрет body/prompt logging          | Низкий          |
| T-06 | Information disclosure | Presigned URL живёт слишком долго          | Высокий     | TTL ≤15 минут, object key scoped to project/version, no public buckets               | Низкий          |
| T-07 | Denial of service      | Upload bomb или огромный PDF               | Высокий     | Размер/page/pixel limits до обработки, streaming, quarantine, timeouts               | Средний         |
| T-08 | Denial of service      | Массовый запуск дорогих jobs               | Высокий     | Server-side quotas, per-user/project rate limits, budget ceiling, cancellation       | Средний         |
| T-09 | Injection              | Документ инструктирует AI раскрыть секреты | Высокий     | Никаких секретов/tools у model call, delimit untrusted input, strict output schema   | Низкий          |
| T-10 | Tampering              | AI выдаёт опасную перепланировку           | Критический | Deterministic rules, blocked zones, warnings, expert-required classification         | Средний         |
| T-11 | Repudiation            | Admin меняет каталог без следа             | Высокий     | Append-only audit with actor, before/after digest, timestamp and trace ID            | Низкий          |
| T-12 | Supply chain           | Вредоносная dependency/image               | Высокий     | Lockfiles, Dependabot, SCA/SBOM, secret scan, signed production images               | Средний         |
| T-13 | Disclosure             | Support видит содержимое без основания     | Высокий     | Metadata-only default, just-in-time approval, reason, expiry and audit               | Низкий          |
| T-14 | Data loss              | Удаление/сбой уничтожает проект            | Высокий     | Versioning, PITR, object versioning, tested restore and deletion workflow            | Низкий          |

## Abuse cases

### Загрузка вредоносного файла

Upload идёт напрямую в quarantine по одноразовой подписанной операции. Сервис
проверяет фактический MIME, размер, число страниц/пикселей и malware. Worker не
исполняет встроенные скрипты, работает с лимитами CPU/RAM/time и публикует только
нормализованный результат.

### Перебор идентификаторов проектов

UUID/ULID не является контролем доступа. API сначала устанавливает actor/tenant,
проверяет membership и только затем загружает объект. Различия ответов не должны
позволять выяснить существование чужого проекта.

### Финансовое истощение через AI

Создающая команда атомарно резервирует квоту. Gateway применяет per-job deadline,
лимит стоимости и provider circuit breaker. Usage ledger записывается независимо
от ответа клиента. Повтор по idempotency key возвращает существующий job.

### Опасное доверие к результату

AI-preview маркируется; результат связан с версией и provenance. Ограничения
разделяются на deterministic pass/warning/block. Изменения несущих конструкций и
регулируемых зон не представляются как законное или безопасное решение.

## Требования к проверке

- authz matrix и негативные IDOR-тесты для каждого project-scoped endpoint;
- тесты MIME spoofing, archive/PDF bomb, превышения квоты и повторной команды;
- проверка CSP/CSRF/cookie flags и отсутствие PII/content в логах;
- tabletop восстановления backup и удаления пользователя до beta;
- vendor review по retention, training policy, data region и breach notification;
- внешний security review перед публичным запуском.

## Открытые решения

Нельзя завершить оценку data residency и legal risk до выбора рынка и облачного
региона. Владельцы security, privacy, product data и incident response должны быть
назначены до выхода из этапа 0.
