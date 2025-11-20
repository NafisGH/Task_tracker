import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";

export default function LoginPage() {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const navigate = useNavigate();

  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault();

    const res = await fetch("http://localhost:4000/api/auth/login", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ username, password }),
    });

    const data = await res.json();

    if (res.ok) {
      localStorage.setItem("token", data.token);
      localStorage.setItem("username", data.username);
      navigate("/");
      alert("Успешный вход!");
    } else {
      alert(data.message || "Ошибка входа");
    }
  };

  return (
    <form
      onSubmit={handleLogin}
      className="max-w-md mx-auto mt-10 flex flex-col gap-4 bg-white p-6 shadow"
    >
      <h2 className="text-xl font-bold">Log in</h2>
      <input
        type="text"
        placeholder="email"
        value={username}
        onChange={(e) => setUsername(e.target.value)}
        className="border p-2 rounded"
      />
      <input
        type="password"
        placeholder="password"
        value={password}
        onChange={(e) => setPassword(e.target.value)}
        className="border p-2 rounded"
      />
      <button className="bg-blue-500 text-white p-2 rounded hover:bg-blue-600">
        Log in
      </button>
      <p className="text-sm">
        Not accaunt ?
        <Link to="/register" className="text-blue-600 hover:underline ml-3">
          Join
        </Link>
      </p>
    </form>
  );
}
