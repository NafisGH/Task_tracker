const pool = require("../db");

// Получить все задачи
async function getAllTasks(userId) {
  const result = await pool.query(
    "SELECT * FROM tasks WHERE user_id = $1 ORDER BY id",
    [userId]
  );
  return result.rows;
}

// Получить задачу по ID
async function getTaskById(id, userId) {
  const result = await pool.query(
    "SELECT * FROM tasks WHERE id = $1 AND user_id = $2",
    [id, userId]
  );
  return result.rows[0];
}

// Создать новую задачу
async function createTask({
  title,
  description,
  status,
  deadline,
  priority,
  user_id,
}) {
  const result = await pool.query(
    "INSERT INTO tasks (title, description, status, deadline, user_id) VALUES ($1, $2, $3, $4, $5, $6) RETURNING *",
    [title, description, status, deadline, priority, user_id]
  );
  return result.rows[0];
}

// Обновить задачу по ID
async function updateTask(
  id,
  { title, description, status, deadline, priority }
) {
  const result = await pool.query(
    "UPDATE tasks SET title = $1, description = $2, status = $3, deadline = $4, priority = $5 WHERE id = $6 RETURNING *",
    [title, description, status, deadline, priority, id]
  );
  return result.rows[0];
}

// Удалить задачу по ID
async function deleteTask(id, userId) {
  await pool.query("DELETE FROM tasks WHERE id = $1 AND user_id = $2", [
    id,
    userId,
  ]);
}

module.exports = {
  getAllTasks,
  getTaskById,
  createTask,
  updateTask,
  deleteTask,
};
