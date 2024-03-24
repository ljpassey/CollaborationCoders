require("dotenv").config();
const express = require("express");
const app = express();
const cors = require("cors");
const { Pool } = require('pg');

const { SERVER_PORT } = process.env;

// Create a PostgreSQL connection pool
const pool = new Pool({
  user: 'postgres',
  host: 'localhost',
  database: 'postgres',
  password: 'postgres',
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
    const result = await pool.query('INSERT INTO users (username, password) VALUES ($1, $2) RETURNING *', [username, password]);

    // Return success response with the newly created user
    res.status(201).json({
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

app.post("/login", (req, res) => {
  // TODO - implement login functionality through DB instead of in-memory
  const { username, password } = req.body;
  if (users.find((user) => user.username === username && user.password === password)) {
    res.status(200).json({
      message: "Login success",
    });
  } else {
    res.status(401).json({
      message: "Could not find user",
    })
  }
});

app.listen(SERVER_PORT, () => {
  console.log(`Example app listening on port ${SERVER_PORT}`);
});
