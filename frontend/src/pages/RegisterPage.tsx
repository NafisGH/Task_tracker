import { useState } from "react";

export default function RegisterPage() {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");

  const handleRegister = async (e: React.FormEvent) => {
    e.preventDefault();

    const res = await fetch("http://localhost:4000/api/auth/register", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ username, password }),
    });

    const data = await res.json();

    if (res.ok) {
      alert("Успешно зарегистрирован! Теперь войдите.");
      window.location.href = "/login";
    } else {
      alert(data.message || "Ошибка регистрации");
    }
  };

  return (
    <form
      onSubmit={handleRegister}
      className="max-w-md mx-auto mt-10 flex flex-col gap-4 bg-white p-6 shadow"
    >
      <h2 className="text-xl font-bold">Регистрация</h2>
      <input
        type="text"
        placeholder="Имя пользователя"
        value={username}
        onChange={(e) => setUsername(e.target.value)}
        className="border p-2 rounded"
      />
      <input
        type="password"
        placeholder="Пароль"
        value={password}
        onChange={(e) => setPassword(e.target.value)}
        className="border p-2 rounded"
      />
      <button className="bg-blue-500 text-white p-2 rounded hover:bg-blue-600">
        Зарегистрироваться
      </button>
    </form>
  );
}
