# Развёртывание

## Быстрый старт (без PostgreSQL)

По умолчанию backend использует профиль `dev` и встроенную H2 с тестовыми товарами.

```bash
cd backend
mvnw.cmd spring-boot:run
```

```bash
cd frontend
npm install
npm run dev
```

Важно: запускайте именно **`npm run dev`** (порт 5173), не `preview` и не файл `index.html` из папки.  
Если каталог пишет 404 — сначала проверьте backend: http://localhost:8080/api/health должно вернуть `{"status":"ok",...}`.

Откройте http://localhost:5173

Swagger UI: http://localhost:8080/swagger-ui.html

**Учётные записи:** при первом запуске backend создаются служебные пользователи `admin`, `client`, `employee` (см. `DevDataInitializer`). Пароли не отображаются в интерфейсе и не хранятся в открытом виде в репозитории.

## PostgreSQL (профиль postgres)

1. Создать базу `ms7comp`.
2. Выполнить скрипт `04-database/ddl.sql` (включая тестовые категории и товары).
3. Запустить backend:

```bash
cd backend
set SPRING_PROFILES_ACTIVE=postgres
mvnw.cmd spring-boot:run
```

Учётные данные БД настраиваются в `backend/src/main/resources/application.yml`.


**Студент:** Хизриев Магомед-Салах Алиевич

**Группа:** ПИЖ-б-о-23-2
