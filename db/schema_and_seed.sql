-- Crear tablas
DROP TABLE IF EXISTS order_items;
DROP TABLE IF EXISTS orders;
DROP TABLE IF EXISTS products;
DROP TABLE IF EXISTS users;

CREATE TABLE users (
    id SERIAL PRIMARY KEY,
    name TEXT NOT NULL,
    email TEXT NOT NULL UNIQUE
);

CREATE TABLE products (
    id SERIAL PRIMARY KEY,
    name TEXT NOT NULL,
    price NUMERIC(10,2) NOT NULL
);

CREATE TABLE orders (
    id SERIAL PRIMARY KEY,
    user_id INTEGER NOT NULL REFERENCES users(id),
    created_at TIMESTAMP NOT NULL DEFAULT NOW()
);

CREATE TABLE order_items (
    id SERIAL PRIMARY KEY,
    order_id INTEGER NOT NULL REFERENCES orders(id),
    product_id INTEGER NOT NULL REFERENCES products(id),
    quantity INTEGER NOT NULL,
    unit_price NUMERIC(10,2) NOT NULL
);

-- Poblar datos "grandes" usando generate_series (PostgreSQL)
-- 1. Usuarios: 1.000
INSERT INTO users (name, email)
SELECT
    'User ' || g AS name,
    'user' || g || '@example.com' AS email
FROM generate_series(1, 1000) AS g;

-- 2. Productos: 5.000
INSERT INTO products (name, price)
SELECT
    'Product ' || g AS name,
    (random() * 100)::NUMERIC(10,2) AS price
FROM generate_series(1, 5000) AS g;

-- 3. Órdenes: 20.000
INSERT INTO orders (user_id, created_at)
SELECT
    (floor(random() * 1000) + 1)::INTEGER AS user_id,
    NOW() - (random() * 365 || ' days')::INTERVAL AS created_at
FROM generate_series(1, 20000) AS g;

-- 4. Ítems de orden: 50.000
INSERT INTO order_items (order_id, product_id, quantity, unit_price)
SELECT
    (floor(random() * 20000) + 1)::INTEGER AS order_id,
    (floor(random() * 5000) + 1)::INTEGER AS product_id,
    (floor(random() * 5) + 1)::INTEGER AS quantity,
    (random() * 100)::NUMERIC(10,2) AS unit_price
FROM generate_series(1, 50000) AS g;

