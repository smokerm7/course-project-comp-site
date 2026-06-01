# Модель бизнес-классов

```mermaid
classDiagram
    class User {id login email role}
    class Client {fullName phone address}
    class Employee {fullName position phone}
    class Category {name description}
    class Product {name price stockQuantity}
    class Order {orderDate totalAmount status}
    class OrderItem {quantity price}
    class RepairRequest {deviceType deviceModel problemDescription status}
    class Payment {amount method status}

    User "1" --> "0..1" Client
    User "1" --> "0..1" Employee
    Category "1" --> "*" Product
    Client "1" --> "*" Order
    Order "1" --> "*" OrderItem
    Product "1" --> "*" OrderItem
    Client "1" --> "*" RepairRequest
    Employee "1" --> "*" RepairRequest
    Order "1" --> "0..1" Payment
```


**Студент:** Хизриев Магомед-Салах Алиевич

**Группа:** ПИЖ-б-о-23-2
