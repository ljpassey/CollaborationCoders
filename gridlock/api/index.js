require("dotenv").config();
const express = require("express");
const app = express();
const cors = require("cors");
const { Pool } = require("pg");

const { SERVER_PORT } = process.env;

// Create a PostgreSQL connection pool
const pool = new Pool({
  user: "postgres",
  host: "localhost",
  database: "postgres",
  password: "postgres",
  port: 5432, // Default PostgreSQL port
});

const users = [];

app.use(express.json());
app.use(
  cors({
    origin: "http://localhost:4200",
    methods: ["GET", "POST", "PUT", "PATCH", "DELETE"],
    allowedHeaders: ["Content-Type", "Authorization"],
  })
);

app.get("/", (req, res) => {
  res.send("Hello World!");
});

app.post("/register", async (req, res) => {
  const { username, password } = req.body;

  try {
    // Create `users` table if it doesn't exist
    await pool.query(`CREATE TABLE IF NOT EXISTS users (
        id SERIAL PRIMARY KEY,
        username VARCHAR(50) UNIQUE NOT NULL,
        password VARCHAR(100) NOT NULL,
        created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
    );`);

    // Insert the new user into the database
    const result = await pool.query(
      "INSERT INTO users (username, password) VALUES ($1, $2) RETURNING *",
      [username, password]
    );

    // Return success response with the newly created user
    res.status(200).json({
      success: true,
      user: result.rows[0],
    });
  } catch (error) {
    // Return error response if registration fails
    res.status(500).json({
      success: false,
      error: error.message,
    });
  }
});

app.post("/game", async (req, res) => {
  const { gameboard, player1, player2, winner, lastmove } = req.body;
  try {
    await pool.query(`CREATE TABLE IF NOT EXISTS games (
    id SERIAL PRIMARY KEY,
    created_by VARCHAR(50) UNIQUE NOT NULL,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    gameboard JSON NOT NULL,
    player1 VARCHAR(50) NOT NULL,
    player2 VARCHAR(50) NOT NULL,
    winner VARCHAR(50) NOT NULL,
    lastmove JSON NOT NULL,
);`);

    const result = await pool.query(
      "INSERT INTO games (gameboard, player1, player2, winner, lastmove) VALUES ($1, $2, $3, $4, $5) RETURNING *",
      [gameboard, player1, player2, winner, lastmove]
    );

    if (result.rows.length === 0) {
      return res.status(401).json({
        success: false,
        message: "Invalid game",
      });
    }
  } catch (error) {
    res.status(500).json({
      success: false,
      error: error.message,
    });
  }
});

app.put("/game/:id", (req, res) => {});

app.get("/game/:id", (req, res) => {});

app.post("/login", async (req, res) => {
  const { username, password } = req.body;

  try {
    const result = await pool.query(
      "SELECT * FROM users WHERE username = $1 AND password = $2",
      [username, password]
    );

    if (result.rows.length === 0) {
      return res.status(401).json({
        success: false,
        message: "Invalid username or password",
      });
    }

    res.status(200).json({
      success: true,
      user: result.rows[0],
      token: Math.random().toString(36).substring(7),
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      error: error.message,
    });
  }
});

app.listen(SERVER_PORT, () => {
  console.log(`Example app listening on port ${SERVER_PORT}`);
});
