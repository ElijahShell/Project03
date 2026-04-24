import "dotenv/config";
import express from "express";
import cors from "cors";
import chalk from "chalk";
import pool from "./db/pool.js";

const app = express();
const PORT = process.env.PORT || 3000;

// Middleware
app.use(express.json());

app.use(
  cors({
    origin: "https://project03-tawny.vercel.app",
    methods: ["GET", "POST", "PUT", "DELETE"],
    credentials: true,
  })
);

// Test DB connection
async function start() {
  try {
    console.log("Connecting to database...");

    await pool.query("SELECT 1");

    console.log(chalk.green("✅ Database connected"));

    app.listen(PORT, () => {
      console.log(chalk.green(`✅ Server running on port ${PORT}`));
    });

  } catch (err) {
    const message = err instanceof Error ? err.message : String(err);
    console.error(chalk.red("❌ DB connection failed:"), message);
    process.exit(1);
  }
}

start();

// ================= ROUTES =================

// CREATE
app.post("/bookings", async (req, res) => {
  try {
    const { name, email, date, style } = req.body;

    const result = await pool.query(
      "INSERT INTO bookings (name, email, date, style) VALUES ($1,$2,$3,$4) RETURNING *",
      [name, email, date, style]
    );

    console.log("Inserted:", result.rows[0]); // 👈 DEBUG

    res.json(result.rows[0]); // MUST return JSON
  } catch (err: any) {
    console.error("POST ERROR:", err.message);
    res.status(500).json({ error: "Failed to create booking" });
  }
});

// READ
app.get("/bookings", async (req, res) => {
  try {
    const result = await pool.query(
      "SELECT * FROM bookings ORDER BY created_at DESC"
  );

    res.json(result.rows);
  } catch (err: any) {
    console.error("GET ERROR:", err.message);
    res.status(500).json({ error: "Failed to fetch bookings" });
  }
});

// UPDATE
app.put("/bookings/:id", async (req, res) => {
  try {
    const { id } = req.params;
    const { name, email, date, style } = req.body;

    const result = await pool.query(
      `UPDATE bookings
       SET name=$1, email=$2, date=$3, style=$4, updated_at=NOW()
       WHERE id=$5
       RETURNING *`,
      [name, email, date, style, id]
    );

    res.json(result.rows[0]);
  } catch (err: any) {
    console.error("PUT ERROR:", err.message);
    res.status(500).json({ error: "Failed to update booking" });
  }
});

// DELETE
app.delete("/bookings/:id", async (req, res) => {
  const { id } = req.params;

  const result = await pool.query(
    "DELETE FROM bookings WHERE id=$1 RETURNING *",
    [id]
  );

  res.json(result.rows[0]);
});

start();