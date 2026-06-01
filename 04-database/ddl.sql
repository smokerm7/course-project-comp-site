CREATE TABLE users (
    id BIGSERIAL PRIMARY KEY,
    username VARCHAR(50) NOT NULL UNIQUE,
    email VARCHAR(100) NOT NULL UNIQUE,
    password_hash VARCHAR(255) NOT NULL,
    role VARCHAR(20) NOT NULL CHECK (role IN ('CLIENT','EMPLOYEE','ADMIN')),
    created_at TIMESTAMP NOT NULL DEFAULT NOW()
);

CREATE TABLE clients (
    id BIGSERIAL PRIMARY KEY,
    user_id BIGINT NOT NULL UNIQUE REFERENCES users(id) ON DELETE CASCADE,
    full_name VARCHAR(100) NOT NULL,
    phone VARCHAR(20) NOT NULL,
    address VARCHAR(255)
);

CREATE TABLE employees (
    id BIGSERIAL PRIMARY KEY,
    user_id BIGINT NOT NULL UNIQUE REFERENCES users(id) ON DELETE CASCADE,
    full_name VARCHAR(100) NOT NULL,
    position VARCHAR(100) NOT NULL,
    phone VARCHAR(20)
);

CREATE TABLE categories (
    id BIGSERIAL PRIMARY KEY,
    name VARCHAR(100) NOT NULL UNIQUE,
    description TEXT
);

CREATE TABLE products (
    id BIGSERIAL PRIMARY KEY,
    category_id BIGINT NOT NULL REFERENCES categories(id),
    name VARCHAR(150) NOT NULL,
    description TEXT,
    manufacturer VARCHAR(100),
    price NUMERIC(10,2) NOT NULL CHECK (price > 0),
    stock_quantity INTEGER NOT NULL DEFAULT 0 CHECK (stock_quantity >= 0),
    image_url VARCHAR(255),
    created_at TIMESTAMP NOT NULL DEFAULT NOW()
);

CREATE TABLE statuses (
    id BIGSERIAL PRIMARY KEY,
    name VARCHAR(50) NOT NULL,
    type VARCHAR(20) NOT NULL CHECK (type IN ('ORDER','REPAIR')),
    description TEXT
);

CREATE TABLE orders (
    id BIGSERIAL PRIMARY KEY,
    client_id BIGINT NOT NULL REFERENCES clients(id),
    status_id BIGINT NOT NULL REFERENCES statuses(id),
    order_date TIMESTAMP NOT NULL DEFAULT NOW(),
    total_amount NUMERIC(10,2) NOT NULL CHECK (total_amount >= 0),
    delivery_address VARCHAR(255)
);

CREATE TABLE order_items (
    id BIGSERIAL PRIMARY KEY,
    order_id BIGINT NOT NULL REFERENCES orders(id) ON DELETE CASCADE,
    product_id BIGINT NOT NULL REFERENCES products(id),
    quantity INTEGER NOT NULL CHECK (quantity > 0),
    price NUMERIC(10,2) NOT NULL CHECK (price > 0)
);

CREATE TABLE repair_requests (
    id BIGSERIAL PRIMARY KEY,
    client_id BIGINT NOT NULL REFERENCES clients(id),
    employee_id BIGINT REFERENCES employees(id),
    status_id BIGINT NOT NULL REFERENCES statuses(id),
    device_type VARCHAR(100) NOT NULL,
    device_model VARCHAR(100) NOT NULL,
    problem_description TEXT NOT NULL,
    master_comment TEXT,
    estimated_price NUMERIC(10,2) CHECK (estimated_price >= 0),
    created_at TIMESTAMP NOT NULL DEFAULT NOW(),
    updated_at TIMESTAMP
);

CREATE TABLE payments (
    id BIGSERIAL PRIMARY KEY,
    order_id BIGINT NOT NULL UNIQUE REFERENCES orders(id) ON DELETE CASCADE,
    amount NUMERIC(10,2) NOT NULL CHECK (amount >= 0),
    payment_method VARCHAR(50) NOT NULL,
    payment_status VARCHAR(50) NOT NULL,
    payment_date TIMESTAMP NOT NULL DEFAULT NOW()
);

CREATE INDEX idx_products_category ON products(category_id);
CREATE INDEX idx_orders_client ON orders(client_id);
CREATE INDEX idx_order_items_order ON order_items(order_id);
CREATE INDEX idx_repairs_client ON repair_requests(client_id);
CREATE INDEX idx_repairs_employee ON repair_requests(employee_id);
CREATE INDEX idx_repairs_status ON repair_requests(status_id);

INSERT INTO statuses (name, type, description) VALUES
('Новый','ORDER','Заказ создан клиентом'),
('В обработке','ORDER','Заказ обрабатывается сотрудником'),
('Готов к выдаче','ORDER','Заказ готов к получению'),
('Завершён','ORDER','Заказ завершён'),
('Отменён','ORDER','Заказ отменён'),
('Принята','REPAIR','Заявка создана'),
('Диагностика','REPAIR','Устройство на диагностике'),
('Ожидание запчастей','REPAIR','Ожидаются комплектующие'),
('В ремонте','REPAIR','Выполняется ремонт'),
('Готово к выдаче','REPAIR','Устройство готово'),
('Выдано клиенту','REPAIR','Устройство получено клиентом'),
('Отменена','REPAIR','Заявка отменена');

INSERT INTO categories (name, description) VALUES
('Видеокарты', 'NVIDIA GeForce и AMD Radeon'),
('Процессоры', 'AMD Ryzen и Intel Core'),
('ОЗУ', 'Модули DDR4 и DDR5'),
('SSD', 'Накопители NVMe и SATA SSD'),
('HDD', 'Жёсткие диски для хранения'),
('Материнские платы', 'Платы для Intel и AMD'),
('Мониторы', 'Игровые и офисные мониторы'),
('Ноутбуки', 'Игровые и универсальные ноутбуки'),
('Готовые ПК MS7-COMP', 'Собранные компьютеры под ключ');

INSERT INTO products (category_id, name, description, manufacturer, price, stock_quantity) VALUES
(1, 'RTX 3050', 'GeForce RTX 3050', 'NVIDIA', 24990.00, 12),
(1, 'RTX 3060', 'GeForce RTX 3060', 'NVIDIA', 32990.00, 10),
(1, 'RTX 4060', 'GeForce RTX 4060', 'NVIDIA', 39990.00, 10),
(1, 'RTX 4060 Ti', 'GeForce RTX 4060 Ti', 'NVIDIA', 49990.00, 8),
(1, 'RTX 4070', 'GeForce RTX 4070', 'NVIDIA', 69990.00, 8),
(1, 'RTX 4070 Super', 'GeForce RTX 4070 Super', 'NVIDIA', 79990.00, 6),
(1, 'RTX 4080 Super', 'GeForce RTX 4080 Super', 'NVIDIA', 149990.00, 4),
(1, 'RTX 4090', 'GeForce RTX 4090', 'NVIDIA', 249990.00, 2),
(1, 'RX 6600', 'Radeon RX 6600', 'AMD', 24990.00, 12),
(1, 'RX 6700 XT', 'Radeon RX 6700 XT', 'AMD', 39990.00, 8),
(1, 'RX 7600', 'Radeon RX 7600', 'AMD', 32990.00, 10),
(1, 'RX 7700 XT', 'Radeon RX 7700 XT', 'AMD', 54990.00, 8),
(1, 'RX 7800 XT', 'Radeon RX 7800 XT', 'AMD', 69990.00, 6),
(1, 'RX 7900 GRE', 'Radeon RX 7900 GRE', 'AMD', 79990.00, 5),
(1, 'RX 7900 XTX', 'Radeon RX 7900 XTX', 'AMD', 119990.00, 3),
(2, 'Ryzen 5 5500', '6 ядер, AM4', 'AMD', 9990.00, 15),
(2, 'Ryzen 5 5600', '6 ядер, AM4', 'AMD', 11990.00, 15),
(2, 'Ryzen 7 5700X', '8 ядер, AM4', 'AMD', 18990.00, 12),
(2, 'Ryzen 7 5800X3D', '8 ядер, 3D V-Cache', 'AMD', 29990.00, 8),
(2, 'Ryzen 7 7800X3D', '8 ядер, AM5', 'AMD', 44990.00, 6),
(2, 'Ryzen 9 7900X', '12 ядер, AM5', 'AMD', 52990.00, 5),
(2, 'Ryzen 9 9950X', '16 ядер, AM5', 'AMD', 79990.00, 3),
(2, 'Intel i3-12100F', '4 ядра, LGA1700', 'Intel', 8990.00, 15),
(2, 'Intel i5-12400F', '6 ядер, LGA1700', 'Intel', 13990.00, 12),
(2, 'Intel i5-13400F', '10 ядер, LGA1700', 'Intel', 18990.00, 10),
(2, 'Intel i5-14600KF', '14 ядер, LGA1700', 'Intel', 29990.00, 8),
(2, 'Intel i7-14700KF', '20 ядер, LGA1700', 'Intel', 45990.00, 6),
(2, 'Intel i9-14900KF', '24 ядра, LGA1700', 'Intel', 69990.00, 4),
(3, 'Kingston Fury 16GB DDR4', 'Комплект 16 ГБ DDR4', 'Kingston', 4990.00, 25),
(3, 'Kingston Fury 32GB DDR4', 'Комплект 32 ГБ DDR4', 'Kingston', 9990.00, 20),
(3, 'Kingston Fury 64GB DDR4', 'Комплект 64 ГБ DDR4', 'Kingston', 18990.00, 10),
(3, 'Corsair DDR5 16GB', 'Модуль 16 ГБ DDR5', 'Corsair', 6990.00, 25),
(3, 'Corsair DDR5 32GB', 'Комплект 32 ГБ DDR5', 'Corsair', 13990.00, 18),
(3, 'Corsair DDR5 64GB', 'Комплект 64 ГБ DDR5', 'Corsair', 26990.00, 10),
(3, 'G.Skill Z5 32GB', 'DDR5 для Intel/AMD', 'G.Skill', 15990.00, 15),
(3, 'G.Skill Z5 64GB', 'DDR5 для Intel/AMD', 'G.Skill', 29990.00, 8),
(4, 'Kingston NV2 500GB', 'NVMe M.2', 'Kingston', 3490.00, 30),
(4, 'Kingston NV2 1TB', 'NVMe M.2', 'Kingston', 5990.00, 25),
(4, 'Kingston NV2 2TB', 'NVMe M.2', 'Kingston', 10990.00, 15),
(4, 'Samsung 980 500GB', 'NVMe PCIe 3.0', 'Samsung', 4990.00, 25),
(4, 'Samsung 980 1TB', 'NVMe PCIe 3.0', 'Samsung', 8990.00, 20),
(4, 'Samsung 990 Pro 1TB', 'NVMe PCIe 4.0', 'Samsung', 13990.00, 15),
(4, 'Samsung 990 Pro 2TB', 'NVMe PCIe 4.0', 'Samsung', 24990.00, 10),
(4, 'WD SN770 1TB', 'NVMe M.2', 'Western Digital', 7990.00, 18),
(4, 'WD SN850X 2TB', 'NVMe PCIe 4.0', 'Western Digital', 21990.00, 8),
(5, 'WD Blue 1TB', '3.5", 7200 об/мин', 'Western Digital', 3990.00, 20),
(5, 'WD Blue 2TB', '3.5", 7200 об/мин', 'Western Digital', 5990.00, 18),
(5, 'WD Blue 4TB', '3.5", 7200 об/мин', 'Western Digital', 9990.00, 12),
(5, 'Seagate Barracuda 1TB', '3.5", 7200 об/мин', 'Seagate', 4290.00, 20),
(5, 'Seagate Barracuda 2TB', '3.5", 7200 об/мин', 'Seagate', 6490.00, 16),
(5, 'Seagate Barracuda 4TB', '3.5", 7200 об/мин', 'Seagate', 10990.00, 12),
(6, 'ASRock H610M-HDV', 'LGA1700, DDR4', 'ASRock', 7990.00, 15),
(6, 'ASUS PRIME B550M-K', 'AM4, DDR4', 'ASUS', 10990.00, 12),
(6, 'MSI B760 Gaming Plus', 'LGA1700, DDR5', 'MSI', 18990.00, 10),
(6, 'Gigabyte B650 Aorus', 'AM5, DDR5', 'Gigabyte', 23990.00, 8),
(6, 'ASUS TUF B650 Plus', 'AM5, DDR5', 'ASUS', 26990.00, 8),
(6, 'Gigabyte Z790 Gaming X', 'LGA1700, DDR5', 'Gigabyte', 32990.00, 6),
(7, 'Xiaomi A27i', '27", IPS, 100 Гц', 'Xiaomi', 11990.00, 15),
(7, 'AOC 24G2SPAE', '24", IPS, 165 Гц', 'AOC', 15990.00, 12),
(7, 'Samsung Odyssey G5', '27", VA, 144 Гц', 'Samsung', 27990.00, 10),
(7, 'LG UltraGear 27GN800', '27", IPS, 144 Гц', 'LG', 29990.00, 8),
(7, 'MSI G274QPF', '27", IPS, 170 Гц', 'MSI', 32990.00, 8),
(7, 'Samsung Odyssey G7', '32", VA, 240 Гц', 'Samsung', 54990.00, 5),
(8, 'Acer Nitro V15', 'Игровой ноутбук 15.6"', 'Acer', 89990.00, 6),
(8, 'HP Victus 15', 'Игровой ноутбук 15.6"', 'HP', 94990.00, 6),
(8, 'MSI Katana 15', 'Игровой ноутбук 15.6"', 'MSI', 119990.00, 5),
(8, 'ASUS TUF Gaming A15', 'Игровой ноутбук 15.6"', 'ASUS', 129990.00, 5),
(8, 'Lenovo Legion 5', 'Игровой ноутбук 15.6"', 'Lenovo', 159990.00, 4),
(8, 'ASUS ROG Strix G16', 'Игровой ноутбук 16"', 'ASUS', 199990.00, 3),
(9, 'MS7-COMP Office', 'Офисный ПК', 'MS7-COMP', 39990.00, 8),
(9, 'MS7-COMP Home', 'Домашний ПК', 'MS7-COMP', 59990.00, 6),
(9, 'MS7-COMP Gamer Start', 'Игровая сборка Full HD', 'MS7-COMP', 89990.00, 5),
(9, 'MS7-COMP Gamer Pro', 'Игровая сборка 2K', 'MS7-COMP', 149990.00, 4),
(9, 'MS7-COMP Gamer Ultra', 'Топовая сборка 4K', 'MS7-COMP', 249990.00, 2),
(9, 'MS7-COMP Stream Edition', 'ПК для стримеров', 'MS7-COMP', 199990.00, 3);
