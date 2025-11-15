// backend/src/index.js
require('dotenv').config();
const express = require('express');
const { Pool } = require('pg');

const app = express();
const port = process.env.PORT || 3000;

// Pool de conexiones a PostgreSQL
const pool = new Pool({
  connectionString: process.env.DATABASE_URL,
});

app.use(express.json());

// Endpoint simple de salud
app.get('/api/health', (req, res) => {
  res.json({ status: 'ok' });
});

// Endpoint para obtener productos (para lecturas masivas)
app.get('/api/products', async (req, res) => {
  try {
    const { rows } = await pool.query(
      'SELECT id, name, price FROM products LIMIT 1000'
    );
    res.json(rows);
  } catch (err) {
    console.error('Error /api/products', err);
    res.status(500).json({ error: 'Internal server error' });
  }
});

// Endpoint para obtener órdenes con join (más costoso)
app.get('/api/orders', async (req, res) => {
  try {
    const { rows } = await pool.query(
      `SELECT o.id,
              o.created_at,
              u.name AS user_name,
              COUNT(oi.id) AS items_count,
              SUM(oi.quantity * oi.unit_price) AS total
       FROM orders o
       JOIN users u ON u.id = o.user_id
       JOIN order_items oi ON oi.order_id = o.id
       GROUP BY o.id, o.created_at, u.name
       ORDER BY o.created_at DESC
       LIMIT 200`
    );
    res.json(rows);
  } catch (err) {
    console.error('Error /api/orders', err);
    res.status(500).json({ error: 'Internal server error' });
  }
});

// Endpoint para crear una orden (escritura)
app.post('/api/orders', async (req, res) => {
  const { userId, items } = req.body;
  // items: [{ productId, quantity, unitPrice }, ...]

  if (!userId || !Array.isArray(items) || items.length === 0) {
    return res.status(400).json({ error: 'Datos de orden inválidos' });
  }

  const client = await pool.connect();
  try {
    await client.query('BEGIN');

    const orderResult = await client.query(
      'INSERT INTO orders (user_id) VALUES ($1) RETURNING id',
      [userId]
    );
    const orderId = orderResult.rows[0].id;

    const insertPromises = items.map((item) =>
      client.query(
        `INSERT INTO order_items (order_id, product_id, quantity, unit_price)
         VALUES ($1, $2, $3, $4)`,
        [orderId, item.productId, item.quantity, item.unitPrice]
      )
    );

    await Promise.all(insertPromises);

    await client.query('COMMIT');
    res.status(201).json({ orderId });
  } catch (err) {
    await client.query('ROLLBACK');
    console.error('Error POST /api/orders', err);
    res.status(500).json({ error: 'Internal server error' });
  } finally {
    client.release();
  }
});

app.listen(port, () => {
  console.log(`Backend escuchando en http://localhost:${port}`);
});

