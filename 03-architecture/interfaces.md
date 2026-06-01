# Спецификация интерфейсов

## REST API

| Метод | URL | Описание | Доступ |
|---|---|---|---|
| POST | /api/auth/register | Регистрация | Public |
| POST | /api/auth/login | Вход | Public |
| GET | /api/products | Каталог | Public |
| GET | /api/products/{id} | Карточка товара | Public |
| POST | /api/orders | Создать заказ | CLIENT |
| GET | /api/orders/my | Мои заказы | CLIENT |
| POST | /api/repairs | Создать заявку | CLIENT |
| GET | /api/repairs/my | Мои заявки | CLIENT |
| PATCH | /api/repairs/{id}/status | Изменить статус ремонта | EMPLOYEE, ADMIN |
| POST | /api/admin/products | Добавить товар | ADMIN |

## Интерфейсы сервисов

```java
public interface ProductService { List<ProductDto> findAll(); ProductDto findById(Long id); }
public interface OrderService { OrderDto createOrder(Long clientId, CreateOrderRequest request); }
public interface RepairService { RepairDto createRepair(Long clientId, RepairCreateRequest request); }
```


**Студент:** Хизриев Магомед-Салах Алиевич

**Группа:** ПИЖ-б-о-23-2
