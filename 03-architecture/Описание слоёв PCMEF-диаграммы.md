# Описание слоёв PCMEF

| Слой | Компоненты | Ответственность |
|---|---|---|
| Presentation | React-страницы, компоненты, Axios API | Отображение интерфейса, ввод данных |
| Control | AuthController, ProductController, OrderController, RepairController | Приём HTTP-запросов, валидация DTO |
| Mediator | AuthService, ProductService, OrderService, RepairService | Бизнес-логика, транзакции |
| Entity | User, Product, Order, RepairRequest, DTO | Модель предметной области |
| Foundation | Repository-интерфейсы | Доступ к PostgreSQL |


**Студент:** Хизриев Магомед-Салах Алиевич

**Группа:** ПИЖ-б-о-23-2
