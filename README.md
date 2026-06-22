# Курсовой проект: Веб-приложение компьютерной фирмы «MS7-COMP»

**Траектория В — Веб-разработка (React + Spring Boot Backend)**  
**Дисциплина:** Программная Инженерия  
**Институт:** Институт перспективной инженерии
**Группа:** ПИЖ-б-о-23-2
**Студент:** Хизриев Магомед-Салах Алиевич
---

## Описание проекта

**MS7-COMP** — веб-приложение для компьютерной фирмы, занимающейся продажей компьютерной техники, комплектующих и приёмом заявок на ремонт устройств. Система позволяет клиентам просматривать каталог, оформлять заказы, создавать заявки на ремонт и отслеживать их статусы, а сотрудникам и администратору — управлять товарами, заказами, клиентами и ремонтными работами.

### Технологический стек

| Уровень | Технология |
|---|---|
| Веб-приложение | React 18, TypeScript, Vite, Axios |
| Серверная часть | Java 17, Spring Boot 3.x, Spring Security, Spring Data JPA |
| База данных | PostgreSQL |
| Аутентификация | JWT + BCrypt |
| Документация API | OpenAPI 3 (Swagger UI) |
| Архитектура | PCMEF |

---

## Структура документации

### [📁 Этап 0 — Инициация и бизнес-анализ](01-business-model/README.md) — 5%

| Документ | Описание |
|---|---|
| [Паспорт проекта](01-business-model/project-passport.md) | Цели, риски, KPI, стек технологий |
| [Бизнес-глоссарий](01-business-model/glossary.md) | 20 ключевых терминов предметной области |
| [IDEF0 A-0](01-business-model/idef0-a0.md) | Диаграмма бизнес-контекста |
| [BUC-диаграмма](01-business-model/buc-diagram.md) | Бизнес-прецеденты |
| [Бизнес-классы](01-business-model/business-classes.md) | Модель бизнес-классов |
| [Матрица стейкхолдеров](01-business-model/stakeholders-matrix.md) | Заинтересованные стороны |
| [SWOT-анализ](01-business-model/swot-analysis.md) | Анализ текущего процесса продажи и ремонта |

---

### [📁 Этап 1 — Проектирование требований](02-requirements/README.md) — 10%

| Документ | Описание |
|---|---|
| [Use Case диаграмма](02-requirements/use-case-diagram.md) | 14 прецедентов, 3 актора |
| [Domain Model](02-requirements/domain-model.md) | Сущности и их связи |
| [Спецификации прецедентов](02-requirements/use-case-specifications.md) | Детальное описание UC1, UC2, UC3, UC7 |
| [Расширенный глоссарий](02-requirements/glossary-extended.md) | 33 термина |
| [Таблица трассировки](02-requirements/traceability-matrix.md) | Бизнес-цели → UC → статус реализации |

---

### [📁 Этап 2 — Архитектурное проектирование](03-architecture/README.md) — 10%

| Документ | Описание |
|---|---|
| [PCMEF-диаграмма](03-architecture/pcmef-diagram.md) | Слои, компоненты, правила зависимостей |
| [Описание слоёв PCMEF](03-architecture/Описание%20слоёв%20PCMEF-диаграммы.md) | Таблица слоёв и их компонентов |
| [Спецификация интерфейсов](03-architecture/interfaces.md) | IService, IRepository, REST-контракт |
| [Архитектурные решения (ADR)](03-architecture/adr.md) | 5 задокументированных ADR |

---

### [📁 Этап 3 — Проектирование базы данных](04-database/README.md) — 10%

| Документ | Описание |
|---|---|
| [ER-диаграмма + описание таблиц](04-database/README.md) | Логическая модель, маппинг JPA |
| [DDL-скрипты](04-database/ddl.sql) | Создание таблиц, индексов, ограничений PostgreSQL |

---

### [📁 Этап 4 — Детальное проектирование](05-detailed-design/README.md) — 10%

| Документ | Описание |
|---|---|
| [Диаграммы последовательности](05-detailed-design/sequence-diagrams.md) | 4 сценария: login, order, repair, status |
| [Диаграмма классов](05-detailed-design/class-diagram.md) | Детальная структура всех слоёв |
| [Спецификация методов](05-detailed-design/method-specs.md) | Сигнатуры ключевых методов |

---

### [📁 Этап 5 — Реализация ядра](06-implementation/README.md) — 15%

| Документ | Описание |
|---|---|
| [Entity-классы](06-implementation/core-entities.md) | User, Product, Order, RepairRequest + DTO |
| [Репозитории](06-implementation/repositories.md) | Spring Data JPA интерфейсы |
| [Сервисный слой](06-implementation/services.md) | AuthService, ProductService, OrderService, RepairService |
| [Тесты и покрытие](06-implementation/test-coverage.md) | JUnit 5 + Mockito |

---

### [📁 Этап 6 — Рефакторинг и качество](07-refactoring/README.md) — 10%

| Документ | Описание |
|---|---|
| [Статический анализ](07-refactoring/static-analysis.md) | SonarQube, ESLint — до/после |
| [Паттерны](07-refactoring/patterns.md) | DTO, Repository, Service, Lazy Load |
| [Журнал рефакторинга](07-refactoring/refactoring-log.md) | 6 задокументированных изменений |

---

### [📁 Этап 7 — Интерфейс](08-interface/README.md) — 15%

| Документ | Описание |
|---|---|
| [Веб-экраны](08-interface/web-screens.md) | 8 экранов, адаптивная верстка |
| [REST API](08-interface/api-endpoints.md) | 18 эндпоинтов, OpenAPI/Swagger |
| [Безопасность](08-interface/security.md) | JWT, BCrypt, роли, CORS |
| [Развёртывание](08-interface/deployment.md) | Инструкция по запуску сервера и клиента |

---

### [📁 Этап 8 — Завершение](09-completion/README.md) — 15%

| Документ | Описание |
|---|---|
| [WBS](09-completion/wbs.md) | Иерархическая структура работ, ~205 ч |
| [Диаграмма Ганта](09-completion/gantt.md) | Календарный план 18 недель |
| [COCOMO](09-completion/cocomo.md) | Оценка трудозатрат (~3900 SLOC) |
| [Техническое задание](09-completion/tech-spec.md) | Итоговое ТЗ проекта |
| [Руководство пользователя](09-completion/user-guide.md) | Инструкция по работе с приложением |
| [Руководство администратора](09-completion/admin-guide.md) | Установка и настройка сервера |

---

## Быстрый запуск

**Требования:** JDK 17+, Node.js 20+

```bash
# Backend (профиль dev — встроенная H2, тестовые товары)
cd backend
mvnw.cmd spring-boot:run

# Frontend (в другом терминале)
cd frontend
npm install
npm run dev
```

## Демо

Веб-интерфейс:
http://store.ms7pc.shop

Для доступа используются тестовые учётные записи, выдаваемые преподавателю отдельно.

Примечание: для проекта подготовлена поддержка HTTPS и выпущен SSL-сертификат. 

Для PostgreSQL см. [инструкцию по развёртыванию](08-interface/deployment.md) (профиль `postgres`).

> На компьютере должен быть установлен **JDK 17** (не JRE 8). Проверка: `java -version`.

---

## Реализованный функционал

### Реализовано в коде

**Backend:** JWT-аутентификация, роли CLIENT / EMPLOYEE / ADMIN, каталог, заказы, ремонт, админ CRUD товаров, Swagger, H2 (dev) и PostgreSQL (postgres).

**Frontend (8 экранов):** главная, каталог с фильтром, карточка товара, корзина, оформление заказа, заявка на ремонт, личный кабинет, панель admin/employee.

**Служебные учётные записи** создаются при первом запуске backend (`DevDataInitializer`). 

