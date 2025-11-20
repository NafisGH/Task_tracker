import React, { useState, type ComponentProps } from "react";
import { Link, useNavigate } from "react-router-dom";
import { Toast } from "../components/Toast";

export default function RegisterPage() {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [toast, setToast] = useState<ComponentProps<typeof Toast> | null>(null);
  const navigate = useNavigate();

  const handleRegister = async (e: React.FormEvent) => {
    e.preventDefault();

    const res = await fetch("http://localhost:4000/api/auth/register", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ username, password }),
    });

    const data = await res.json();

    if (res.ok) {
      // alert("Успешно зарегистрирован! Теперь войдите.");
      navigate("/login");
    } else {
      alert(data.message || "Ошибка регистрации");
    }
  };

  return (
    <>
      {toast && <Toast {...toast} onClose={() => setToast(null)} />}
      <form
        onSubmit={handleRegister}
        className="max-w-md mx-auto mt-10 flex flex-col gap-4 bg-white p-6 shadow"
      >
        <h2 className="text-xl font-bold">Join</h2>
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
          Join
        </button>
        <Link to="/login" className="text-blue-600 hover:underline ml-3">
          Log in
        </Link>
      </form>
    </>
  );
}
