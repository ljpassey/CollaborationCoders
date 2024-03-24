require("dotenv").config();
const express = require("express");
const app = express();
const cors = require("cors");

const { SERVER_PORT } = process.env;

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

app.post("/register", (req, res) => {
  const { username, password } = req.body;
  users.push({ username, password });
  res.json({
    message: "Register success",
  });
});

app.post("/login", (req, res) => {
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
