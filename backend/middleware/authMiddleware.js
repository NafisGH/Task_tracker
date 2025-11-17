const jwt = require("jsonwebtoken");

function authMiddleware(req, res, next) {
  const token = req.headers.authorization?.split(" ")[1];

  if (!token) return res.status(401).json({ message: "Нет токена" });

  try {
    const decoded = jwt.verify(token, process.env.JWT_SECRET);
    req.user = decoded; // id пользователя будет доступен в req.user.id
    next();
  } catch (err) {
    res.status(403).json({ message: "Недействительный токен" });
  }
}

module.exports = authMiddleware;
