# Entity-классы

Основные JPA-сущности: User, Client, Employee, Category, Product, Order, OrderItem, RepairRequest, Status, Payment.

Пример Product:

```java
@Entity
@Table(name = "products")
public class Product {
    @Id @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;
    private String name;
    private BigDecimal price;
    private Integer stockQuantity;
}
```


**Студент:** Хизриев Магомед-Салах Алиевич

**Группа:** ПИЖ-б-о-23-2
