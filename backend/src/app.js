require("dotenv").config();
require("./config/db");

const express = require("express");
const cors = require("cors");
const app = express();

// Middleware
app.use(cors());
app.use(express.json());

// Routes
const authRoutes = require("./routes/authRouter");
const taskRoutes = require("./routes/taskRouter");
const userRoutes = require("./routes/userRouter");
const statusRoutes = require("./routes/statusRouter");
const todoRoutes = require("./routes/todoRouter");

app.use("/api/auth", authRoutes);
app.use("/api/tasks", taskRoutes);
app.use("/api/users", userRoutes);
app.use("/api/statuses", statusRoutes);
app.use("/api/todos", todoRoutes);

// Health Check Route
app.get("/", (req, res) => {
  res.send("✅ TaskFlow Backend is running!");
});

module.exports = app;
