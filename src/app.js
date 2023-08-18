const express = require("express");
// const fs = require("fs");
const cors = require("cors");
const bodyParser = require("body-parser");

const { connectDB } = require("./db");
const { PORT } = require("./config");

const app = express();

app.use(bodyParser.json());
app.use(cors());

connectDB();

app.listen(PORT, () => {
  console.log("App is running on port " + PORT);
});
