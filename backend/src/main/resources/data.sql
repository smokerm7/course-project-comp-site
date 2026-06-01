INSERT INTO statuses (name, type, description) VALUES ('Новый', 'ORDER', 'Заказ создан клиентом');
INSERT INTO statuses (name, type, description) VALUES ('В обработке', 'ORDER', 'Заказ обрабатывается сотрудником');
INSERT INTO statuses (name, type, description) VALUES ('Готов к выдаче', 'ORDER', 'Заказ готов к получению');
INSERT INTO statuses (name, type, description) VALUES ('Завершён', 'ORDER', 'Заказ завершён');
INSERT INTO statuses (name, type, description) VALUES ('Отменён', 'ORDER', 'Заказ отменён');
INSERT INTO statuses (name, type, description) VALUES ('Принята', 'REPAIR', 'Заявка создана');
INSERT INTO statuses (name, type, description) VALUES ('Диагностика', 'REPAIR', 'Устройство на диагностике');
INSERT INTO statuses (name, type, description) VALUES ('Ожидание запчастей', 'REPAIR', 'Ожидаются комплектующие');
INSERT INTO statuses (name, type, description) VALUES ('В ремонте', 'REPAIR', 'Выполняется ремонт');
INSERT INTO statuses (name, type, description) VALUES ('Готово к выдаче', 'REPAIR', 'Устройство готово');
INSERT INTO statuses (name, type, description) VALUES ('Выдано клиенту', 'REPAIR', 'Устройство получено клиентом');
INSERT INTO statuses (name, type, description) VALUES ('Отменена', 'REPAIR', 'Заявка отменена');

INSERT INTO categories (name, description) VALUES ('Видеокарты', 'NVIDIA GeForce и AMD Radeon');
INSERT INTO categories (name, description) VALUES ('Процессоры', 'AMD Ryzen и Intel Core');
INSERT INTO categories (name, description) VALUES ('ОЗУ', 'Модули DDR4 и DDR5');
INSERT INTO categories (name, description) VALUES ('SSD', 'Накопители NVMe и SATA SSD');
INSERT INTO categories (name, description) VALUES ('HDD', 'Жёсткие диски для хранения');
INSERT INTO categories (name, description) VALUES ('Материнские платы', 'Платы для Intel и AMD');
INSERT INTO categories (name, description) VALUES ('Мониторы', 'Игровые и офисные мониторы');
INSERT INTO categories (name, description) VALUES ('Ноутбуки', 'Игровые и универсальные ноутбуки');
INSERT INTO categories (name, description) VALUES ('Готовые ПК MS7-COMP', 'Собранные компьютеры под ключ');

-- Видеокарты (1)
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
(1, 'RX 7900 XTX', 'Radeon RX 7900 XTX', 'AMD', 119990.00, 3);

-- Процессоры (2)
INSERT INTO products (category_id, name, description, manufacturer, price, stock_quantity) VALUES
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
(2, 'Intel i9-14900KF', '24 ядра, LGA1700', 'Intel', 69990.00, 4);

-- ОЗУ (3)
INSERT INTO products (category_id, name, description, manufacturer, price, stock_quantity) VALUES
(3, 'Kingston Fury 16GB DDR4', 'Комплект 16 ГБ DDR4', 'Kingston', 4990.00, 25),
(3, 'Kingston Fury 32GB DDR4', 'Комплект 32 ГБ DDR4', 'Kingston', 9990.00, 20),
(3, 'Kingston Fury 64GB DDR4', 'Комплект 64 ГБ DDR4', 'Kingston', 18990.00, 10),
(3, 'Corsair DDR5 16GB', 'Модуль 16 ГБ DDR5', 'Corsair', 6990.00, 25),
(3, 'Corsair DDR5 32GB', 'Комплект 32 ГБ DDR5', 'Corsair', 13990.00, 18),
(3, 'Corsair DDR5 64GB', 'Комплект 64 ГБ DDR5', 'Corsair', 26990.00, 10),
(3, 'G.Skill Z5 32GB', 'DDR5 для Intel/AMD', 'G.Skill', 15990.00, 15),
(3, 'G.Skill Z5 64GB', 'DDR5 для Intel/AMD', 'G.Skill', 29990.00, 8);

-- SSD (4)
INSERT INTO products (category_id, name, description, manufacturer, price, stock_quantity) VALUES
(4, 'Kingston NV2 500GB', 'NVMe M.2', 'Kingston', 3490.00, 30),
(4, 'Kingston NV2 1TB', 'NVMe M.2', 'Kingston', 5990.00, 25),
(4, 'Kingston NV2 2TB', 'NVMe M.2', 'Kingston', 10990.00, 15),
(4, 'Samsung 980 500GB', 'NVMe PCIe 3.0', 'Samsung', 4990.00, 25),
(4, 'Samsung 980 1TB', 'NVMe PCIe 3.0', 'Samsung', 8990.00, 20),
(4, 'Samsung 990 Pro 1TB', 'NVMe PCIe 4.0', 'Samsung', 13990.00, 15),
(4, 'Samsung 990 Pro 2TB', 'NVMe PCIe 4.0', 'Samsung', 24990.00, 10),
(4, 'WD SN770 1TB', 'NVMe M.2', 'Western Digital', 7990.00, 18),
(4, 'WD SN850X 2TB', 'NVMe PCIe 4.0', 'Western Digital', 21990.00, 8);

-- HDD (5)
INSERT INTO products (category_id, name, description, manufacturer, price, stock_quantity) VALUES
(5, 'WD Blue 1TB', '3.5", 7200 об/мин', 'Western Digital', 3990.00, 20),
(5, 'WD Blue 2TB', '3.5", 7200 об/мин', 'Western Digital', 5990.00, 18),
(5, 'WD Blue 4TB', '3.5", 7200 об/мин', 'Western Digital', 9990.00, 12),
(5, 'Seagate Barracuda 1TB', '3.5", 7200 об/мин', 'Seagate', 4290.00, 20),
(5, 'Seagate Barracuda 2TB', '3.5", 7200 об/мин', 'Seagate', 6490.00, 16),
(5, 'Seagate Barracuda 4TB', '3.5", 7200 об/мин', 'Seagate', 10990.00, 12);

-- Материнские платы (6)
INSERT INTO products (category_id, name, description, manufacturer, price, stock_quantity) VALUES
(6, 'ASRock H610M-HDV', 'LGA1700, DDR4', 'ASRock', 7990.00, 15),
(6, 'ASUS PRIME B550M-K', 'AM4, DDR4', 'ASUS', 10990.00, 12),
(6, 'MSI B760 Gaming Plus', 'LGA1700, DDR5', 'MSI', 18990.00, 10),
(6, 'Gigabyte B650 Aorus', 'AM5, DDR5', 'Gigabyte', 23990.00, 8),
(6, 'ASUS TUF B650 Plus', 'AM5, DDR5', 'ASUS', 26990.00, 8),
(6, 'Gigabyte Z790 Gaming X', 'LGA1700, DDR5', 'Gigabyte', 32990.00, 6);

-- Мониторы (7)
INSERT INTO products (category_id, name, description, manufacturer, price, stock_quantity) VALUES
(7, 'Xiaomi A27i', '27", IPS, 100 Гц', 'Xiaomi', 11990.00, 15),
(7, 'AOC 24G2SPAE', '24", IPS, 165 Гц', 'AOC', 15990.00, 12),
(7, 'Samsung Odyssey G5', '27", VA, 144 Гц', 'Samsung', 27990.00, 10),
(7, 'LG UltraGear 27GN800', '27", IPS, 144 Гц', 'LG', 29990.00, 8),
(7, 'MSI G274QPF', '27", IPS, 170 Гц', 'MSI', 32990.00, 8),
(7, 'Samsung Odyssey G7', '32", VA, 240 Гц', 'Samsung', 54990.00, 5);

-- Ноутбуки (8)
INSERT INTO products (category_id, name, description, manufacturer, price, stock_quantity) VALUES
(8, 'Acer Nitro V15', 'Игровой ноутбук 15.6"', 'Acer', 89990.00, 6),
(8, 'HP Victus 15', 'Игровой ноутбук 15.6"', 'HP', 94990.00, 6),
(8, 'MSI Katana 15', 'Игровой ноутбук 15.6"', 'MSI', 119990.00, 5),
(8, 'ASUS TUF Gaming A15', 'Игровой ноутбук 15.6"', 'ASUS', 129990.00, 5),
(8, 'Lenovo Legion 5', 'Игровой ноутбук 15.6"', 'Lenovo', 159990.00, 4),
(8, 'ASUS ROG Strix G16', 'Игровой ноутбук 16"', 'ASUS', 199990.00, 3);

-- Готовые ПК MS7-COMP (9)
INSERT INTO products (category_id, name, description, manufacturer, price, stock_quantity) VALUES
(9, 'MS7-COMP Office', 'Офисный ПК: документы, браузер, почта', 'MS7-COMP', 39990.00, 8),
(9, 'MS7-COMP Home', 'Домашний ПК: учёба, фильмы, интернет', 'MS7-COMP', 59990.00, 6),
(9, 'MS7-COMP Gamer Start', 'Стартовая игровая сборка Full HD', 'MS7-COMP', 89990.00, 5),
(9, 'MS7-COMP Gamer Pro', 'Продвинутая игровая сборка 2K', 'MS7-COMP', 149990.00, 4),
(9, 'MS7-COMP Gamer Ultra', 'Топовая сборка 4K и стриминг', 'MS7-COMP', 249990.00, 2),
(9, 'MS7-COMP Stream Edition', 'ПК для стримеров и монтажа', 'MS7-COMP', 199990.00, 3);
