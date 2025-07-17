const express = require("express");

const todoRoutes = require("./routes/todoRoutes");
const app = express();
const cors = require("cors");

//MiddleWare
app.use(cors());
app.use(express.json());

app.use("/api/todo", todoRoutes);

module.exports = app;
