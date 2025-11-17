const express = require("express");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
const pool = require("../db");
const router = express.Router();

// Регистрация
router.post("/register", async (req, res) => {
  const { username, password } = req.body;
  const hashed = await bcrypt.hash(password, 10);
  try {
    const user = await pool.query(
      "INSERT INTO users (username, password) VALUES ($1, $2) RETURNING id, username",
      [username, hashed]
    );
    res.status(201).json(user.rows[0]);
  } catch (err) {
    res.status(400).json({ error: "Пользователь уже существует" });
  }
});

// Логин
router.post("/login", async (req, res) => {
  const { username, password } = req.body;
  const user = await pool.query("SELECT * FROM users WHERE username = $1", [
    username,
  ]);
  if (user.rows.length === 0) return res.status(401).json({ error: "Неверно" });
  const match = await bcrypt.compare(password, user.rows[0].password);
  if (!match) return res.status(401).json({ error: "Неверно" });

  const token = jwt.sign({ id: user.rows[0].id }, process.env.JWT_SECRET, {
    expiresIn: "1d",
  });

  res.json({ token, username });
});
module.exports = router;
