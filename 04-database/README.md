# Этап 3: Проектирование базы данных

## ER-модель

```mermaid
erDiagram
    users ||--o| clients : has
    users ||--o| employees : has
    categories ||--o{ products : contains
    clients ||--o{ orders : creates
    orders ||--o{ order_items : contains
    products ||--o{ order_items : included
    clients ||--o{ repair_requests : creates
    employees ||--o{ repair_requests : handles
    statuses ||--o{ orders : defines
    statuses ||--o{ repair_requests : defines
    orders ||--o| payments : paid_by
```

## Таблицы

- users — учётные записи
- clients — клиенты
- employees — сотрудники
- categories — категории товаров
- products — товары
- statuses — статусы заказов и ремонта
- orders — заказы
- order_items — позиции заказа
- repair_requests — заявки на ремонт
- payments — оплаты

DDL-скрипт расположен в файле [ddl.sql](ddl.sql).


**Студент:** Хизриев Магомед-Салах Алиевич

**Группа:** ПИЖ-б-о-23-2
