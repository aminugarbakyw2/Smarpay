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
});// Route na donations
app.get("/donations", async (req, res) => {
  try {
    const result = await pool.query("SELECT * FROM donations");
    res.json(result.rows);
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: "Database error" });
  }
});