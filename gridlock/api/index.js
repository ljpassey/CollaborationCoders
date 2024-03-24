require("dotenv").config();
const express = require("express");
const app = express();
const cors = require("cors");

const { SERVER_PORT } = process.env;

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

app.post("/login", (req, res) => {
  const { username, password } = req.body;
  console.log("username", username);
  console.log("password", password);
  res.json({
    message: "Login success",
  });
});

app.listen(SERVER_PORT, () => {
  console.log(`Example app listening on port ${SERVER_PORT}`);
});
