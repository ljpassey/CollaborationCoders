require("dotenv").config();
const express = require("express");
const app = express();
const cors = require("cors");

const { SERVER_PORT } = process.env;

app.use(express.json());
app.use(cors());

app.get("/", (req, res) => {
  res.send("Hello World!");
});

app.listen(SERVER_PORT, () => {
  console.log(`Example app listening on port ${SERVER_PORT}`);
});