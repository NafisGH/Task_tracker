const pool = require("../db");

// Получить все задачи
async function getAllTasks() {
  const result = await pool.query("SELECT * FROM tasks ORDER BY id");
  return result.rows;
}

// Получить задачу по ID
async function getTaskById(id) {
  const result = await pool.query("SELECT * FROM tasks WHERE id = $1", [id]);
  return result.rows[0];
}

// Создать новую задачу
async function createTask({ title, description, status, deadline }) {
  const result = await pool.query(
    "INSERT INTO tasks (title, description, status, deadline) VALUES ($1, $2, $3, $4) RETURNING *",
    [title, description, status, deadline]
  );
  return result.rows[0];
}

// Обновить задачу по ID
async function updateTask(id, { title, description, status, deadline }) {
  const result = await pool.query(
    "UPDATE tasks SET title = $1, description = $2, status = $3, deadline = $4 WHERE id = $5 RETURNING *",
    [title, description, status, deadline, id]
  );
  return result.rows[0];
}

// Удалить задачу по ID
async function deleteTask(id) {
  await pool.query("DELETE FROM tasks WHERE id = $1", [id]);
}

module.exports = {
  getAllTasks,
  getTaskById,
  createTask,
  updateTask,
  deleteTask,
};
