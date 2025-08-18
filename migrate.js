const { Pool } = require("pg");

const pool = new Pool({
  connectionString: process.env.DATABASE_URL,
  ssl: { rejectUnauthorized: false },
});

async function migrate() {
  try {
    await pool.query(`
      CREATE TABLE IF NOT EXISTS users (
        id SERIAL PRIMARY KEY,
        name VARCHAR(100) NOT NULL
      );
    `);
    await pool.query(`
      INSERT INTO users (name) VALUES ('Aminu'), ('Garba')
      ON CONFLICT DO NOTHING;
    `);
    console.log("✅ Migration done");
    process.exit(0);
  } catch (err) {
    console.error("❌ Migration error:", err);
    process.exit(1);
  }
}

migrate();