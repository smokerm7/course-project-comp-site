# Подготовка и загрузка MS7-COMP на GitHub

## 1. Проверить, что лишние папки удалены

В репозиторий не должны попадать:

```text
frontend/node_modules
frontend/dist
backend/target
.vs
.git
```

## 2. Инициализация Git

```powershell
cd "C:\Users\arbi9\OneDrive\Рабочий стол\MS7-COMP"
git init
git add .
git commit -m "Initial commit: MS7-COMP course project"
```

## 3. Создание репозитория

На GitHub создать новый репозиторий, например: `ms7-comp-course-project`.

## 4. Привязка удалённого репозитория

```powershell
git remote add origin https://github.com/USERNAME/ms7-comp-course-project.git
git branch -M main
git push -u origin main
```

## 5. Описание репозитория

```text
Курсовой проект: веб-приложение компьютерной фирмы MS7-COMP. React + TypeScript, Spring Boot, PostgreSQL, JWT, Swagger.
```
