const express = require("express");
const router = express.Router();
const taskService = require("../services/taskService");

// Получить все задачи
router.get("/", async (req, res) => {
  try {
    const tasks = await taskService.getAllTasks();
    res.json(tasks);
  } catch (error) {
    console.error("Error fetching tasks:", error);
    res.status(500).json({ error: "Internal Server Error" });
  }
});

// Получить задачу по ID
router.get("/:id", async (req, res) => {
  try {
    const task = await taskService.getTaskById(req.params.id);
    if (!task) return res.status(404).json({ error: "Задача не найдена" });
    res.json(task);
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: "Ошибка при получении задачи" });
  }
});

// Создать новую задачу
router.post("/", async (req, res) => {
  try {
    const newTask = await taskService.createTask(req.body);
    res.status(201).json(newTask);
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: "Ошибка при создании задачи" });
  }
});

// Обновить задачу по ID
router.put("/:id", async (req, res) => {
  try {
    const updated = await taskService.updateTask(req.params.id, req.body);
    res.json(updated);
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: "Ошибка при обновлении задачи" });
  }
});

// Удалить задачу по ID
router.delete("/:id", async (req, res) => {
  try {
    await taskService.deleteTask(req.params.id);
    res.status(204).end();
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: "Ошибка при удалении задачи" });
  }
});

module.exports = router;
