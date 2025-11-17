const express = require("express");
const cors = require("cors");
require("dotenv").config();

const app = express();

// Middleware
app.use(cors());
app.use(express.json());

// Маршруты
const taskRoutes = require("./controllers/taskController");
const authRoutes = require("./routes/auth");

app.use("/api/tasks", taskRoutes);
app.use("/api/auth", authRoutes);

// Базовый маршрут для проверки сервера
app.get("/", (req, res) => {
  res.send("Server is running");
});

// Запуск сервера
const PORT = process.env.PORT || 4000;
app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});

// Временно Проверка подключения к базе данных
const pool = require("./db");
pool.query("SELECT NOW()", (err, res) => {
  if (err) {
    console.error("Ошибка подключения к базе", err);
  } else {
    console.log("Подключение к базе успешно", res.rows[0]);
  }
});
