# Спецификация методов

## AuthService

```java
AuthResponse register(RegisterRequest request);
AuthResponse login(LoginRequest request);
String generateToken(User user);
```

## ProductService

```java
List<ProductDto> getAllProducts();
ProductDto getProductById(Long id);
ProductDto createProduct(ProductCreateRequest request);
ProductDto updateProduct(Long id, ProductUpdateRequest request);
void deleteProduct(Long id);
```

## OrderService

```java
OrderDto createOrder(Long clientId, CreateOrderRequest request);
List<OrderDto> getClientOrders(Long clientId);
OrderDto updateOrderStatus(Long orderId, Long statusId);
```

## RepairService

```java
RepairDto createRepairRequest(Long clientId, RepairCreateRequest request);
List<RepairDto> getClientRequests(Long clientId);
RepairDto assignEmployee(Long requestId, Long employeeId);
RepairDto updateStatus(Long requestId, Long statusId);
RepairDto addMasterComment(Long requestId, String comment);
```


**Студент:** Хизриев Магомед-Салах Алиевич

**Группа:** ПИЖ-б-о-23-2
