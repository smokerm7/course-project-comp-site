# Диаграмма классов

```mermaid
classDiagram
    class AuthController
    class ProductController
    class OrderController
    class RepairController
    class AuthService
    class ProductService
    class OrderService
    class RepairService
    class UserRepository
    class ProductRepository
    class OrderRepository
    class RepairRepository
    class User
    class Product
    class Order
    class RepairRequest

    AuthController --> AuthService
    ProductController --> ProductService
    OrderController --> OrderService
    RepairController --> RepairService
    AuthService --> UserRepository
    ProductService --> ProductRepository
    OrderService --> OrderRepository
    RepairService --> RepairRepository
```


**Студент:** Хизриев Магомед-Салах Алиевич

**Группа:** ПИЖ-б-о-23-2
