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
});const { Pool } = require("pg");

const pool = new Pool({
  connectionString: process.env.DATABASE_URL,
  ssl: { rejectUnauthorized: false } // Render/Postgres security
});

pool.connect()
  .then(() => console.log("✅ PostgreSQL connected"))
  .catch(err => console.error("❌ PostgreSQL error:", err));

// Misali route don duba DB
app.get("/db-users", async (req, res) => {
  try {
    const result = await pool.query("SELECT * FROM users");
    res.json(result.rows);
  } catch (err) {
    console.error(err);
    res.status(500).send("DB Error");
  }
});