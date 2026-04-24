import "dotenv/config";
import chalk from "chalk";
import app from "./app.js";
import express from "express";
import cors from "cors";
import pool from "./db/pool.js";
const PORT = process.env.PORT || 3000;
async function start() {
    try {
        await pool.query("SELECT 1");
        console.log(chalk.green("✅ Database connection successful."));
    }
    catch (err) {
        console.error(chalk.red("❌ Failed to connect to the database:"), err.message);
        process.exit(1);
    }
  
    const server = app.listen(PORT, () => {
        console.log(chalk.green(`✅ Express server running on port ${PORT}`));
    });
    
    server.on("error", (err) => {
        console.error(chalk.red("❌ Failed to start server:"), err.message);
        process.exit(1);
    });
};

start();

const app = express();
const PORT = 3001;


app.use(express.json());


app.use(
  cors({
    origin: "https://project03-tawny.vercel.app", 
    methods: ["GET", "POST", "PUT", "DELETE"],
    credentials: true,
  })
);


app.post("/bookings", async (req, res) => {
  const { name, email, date, style } = req.body;

  const result = await pool.query(
    "INSERT INTO bookings (name, email, date, style) VALUES ($1,$2,$3,$4) RETURNING *",
    [name, email, date, style]
  );

  res.json(result.rows[0]);
});

app.get("/bookings", async (req, res) => {
  const result = await pool.query(
    "SELECT * FROM bookings ORDER BY created_at DESC"
  );

  res.json(result.rows);
});

app.put("/bookings/:id", async (req, res) => {
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
});

app.delete("/bookings/:id", async (req, res) => {
  const { id } = req.params;

  const result = await pool.query(
    "DELETE FROM bookings WHERE id=$1 RETURNING *",
    [id]
  );

  res.json(result.rows[0]);
});

app.listen(3000, () => {
  console.log(`Server running on http://localhost:3000`);
});