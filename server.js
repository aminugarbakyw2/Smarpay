const express = require("express");
const app = express();

const PORT = process.env.PORT || 10000;

app.get("/", (req, res) => {
  res.json({ message: "✅ SmartPay API is live!" });
});

app.listen(PORT, () => {
  console.log(`🚀 Server running on port ${PORT}`);
});// Route na donations
app.get("/donate", (req, res) => {
  res.json({ message: "Donation endpoint ready 💰" });
});

// Route na users
app.get("/users", (req, res) => {
  res.json([
    { id: 1, name: "Aminu" },
    { id: 2, name: "Garba" }
  ]);
});// server.js
const express = require("express");
const { Pool } = require("pg");
require("dotenv").config();

const app = express();

// PostgreSQL Connection
const pool = new Pool({
  connectionString: process.env.DATABASE_URL,
  ssl: { rejectUnauthorized: false }, // dole a Render
});

pool.connect()
  .then(() => console.log("✅ PostgreSQL connected"))
  .catch(err => console.error("❌ PostgreSQL error:", err));

// Middleware
app.use(express.json());

// Default Route
app.get("/", (req, res) => {
  res.json({ message: "Welcome to Smarpay API 🚀" });
});

// Users Route (Static)
app.get("/users", (req, res) => {
  res.json([
    { id: 1, name: "Aminu" },
    { id: 2, name: "Garba" }
  ]);
});

// Donation Route
app.get("/donate", (req, res) => {
  res.json({ message: "Donation endpoint ready 💰" });
});

// Database Route - fetch users from PostgreSQL
app.get("/db-users", async (req, res) => {
  try {
    const result = await pool.query("SELECT * FROM users");
    res.json(result.rows);
  } catch (err) {
    console.error(err);
    res.status(500).send("DB Error");
  }
});

// Database Route - add new user
app.post("/db-users", async (req, res) => {
  try {
    const { name } = req.body;
    const result = await pool.query(
      "INSERT INTO users (name) VALUES ($1) RETURNING *",
      [name]
    );
    res.json(result.rows[0]);
  } catch (err) {
    console.error(err);
    res.status(500).send("DB Insert Error");
  }
});

// Server Listen (Render provides PORT env var)
const PORT = process.env.PORT || 10000;
app.listen(PORT, () => {
  console.log(`🚀 Server running on port ${PORT}`);
});