# Диаграммы последовательности

## SD-01 Авторизация

```mermaid
sequenceDiagram
    actor U as Пользователь
    participant UI as React UI
    participant C as AuthController
    participant S as AuthService
    participant R as UserRepository
    U->>UI: Ввод email и пароля
    UI->>C: POST /api/auth/login
    C->>S: login(request)
    S->>R: findByEmail(email)
    R-->>S: User
    S-->>C: JWT + profile
    C-->>UI: AuthResponse
```

## SD-02 Оформление заказа

```mermaid
sequenceDiagram
    actor Client as Клиент
    participant UI as React UI
    participant C as OrderController
    participant S as OrderService
    participant P as ProductRepository
    participant O as OrderRepository
    Client->>UI: Подтвердить корзину
    UI->>C: POST /api/orders
    C->>S: createOrder(clientId, dto)
    S->>P: checkStock()
    S->>O: save(order)
    O-->>S: Order
    S-->>C: OrderDto
    C-->>UI: Номер заказа
```

## SD-03 Создание заявки на ремонт

```mermaid
sequenceDiagram
    actor Client as Клиент
    participant UI as React UI
    participant C as RepairController
    participant S as RepairService
    participant R as RepairRepository
    Client->>UI: Заполнить форму ремонта
    UI->>C: POST /api/repairs
    C->>S: createRepair(clientId, dto)
    S->>R: save(repairRequest)
    R-->>S: RepairRequest
    S-->>C: RepairDto
    C-->>UI: Заявка создана
```

## SD-04 Изменение статуса ремонта

```mermaid
sequenceDiagram
    actor Emp as Сотрудник
    participant UI as Employee Panel
    participant C as RepairController
    participant S as RepairService
    participant R as RepairRepository
    Emp->>UI: Выбрать новый статус
    UI->>C: PATCH /api/repairs/{id}/status
    C->>S: updateStatus(id, statusId)
    S->>R: findById(id)
    S->>R: save(updated)
    C-->>UI: Обновленная заявка
```


**Студент:** Хизриев Магомед-Салах Алиевич

**Группа:** ПИЖ-б-о-23-2
