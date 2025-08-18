const express = require("express");
const app = express();

const PORT = process.env.PORT || 10000;

app.get("/", (req, res) => {
  res.json({ message: "✅ SmartPay API is live!" });
});

app.listen(PORT, () => {
  console.log(`🚀 Server running on port ${PORT}`);
});