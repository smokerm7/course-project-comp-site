-- Optional manual seed for PostgreSQL (after ddl.sql).
-- Prefer DevDataInitializer on application startup when possible.
-- BCrypt strength 10; regenerate with BCryptPasswordEncoder if passwords change.

INSERT INTO users (username, email, password_hash, role) VALUES
('client', 'client@ms7.local', '$2a$10$ABy3Zed9B9DrPPDpCH2uteANAHiVDX/elrCpyZvzEjxAyOAXbFY6m', 'CLIENT'),
('employee', 'employee@ms7.local', '$2a$10$ttZyZXiFMcTpoMs8LgB0cORgpdiG8rF/iLyOCJ52VZZOtwyZwB34G', 'EMPLOYEE'),
('admin', 'admin@ms7.local', '$2a$10$ESihx7pBSIMtmAJ2zpB1o.1XRAlWH/xiD1jtsrsoLOqJy6K6oPwIe', 'ADMIN')
ON CONFLICT (username) DO UPDATE SET password_hash = EXCLUDED.password_hash;

-- Link profiles (adjust user_id if IDs differ)
INSERT INTO clients (user_id, full_name, phone, address)
SELECT id, 'Тестовый Клиент', '+7-900-000-00-01', 'Ставрополь' FROM users WHERE username = 'client'
  AND NOT EXISTS (SELECT 1 FROM clients c WHERE c.user_id = users.id);

INSERT INTO employees (user_id, full_name, position, phone)
SELECT id, 'Тестовый Сотрудник', 'Мастер ремонта', '+7-900-000-00-02' FROM users WHERE username = 'employee'
  AND NOT EXISTS (SELECT 1 FROM employees e WHERE e.user_id = users.id);
