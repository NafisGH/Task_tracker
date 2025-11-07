import { useState } from "react";
import { useCreateTaskMutation } from "../features/tasks/tasksApi";

export function TaskForm() {
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [deadline, setDeadline] = useState("");
  //   const [status, setStatus] = useState("open");

  // Мутация для создания задачи
  const [createTask, { isLoading }] = useCreateTaskMutation();

  // Обработка отправки задачи
  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    // Валидация
    if (!title.trim()) return alert("Название задачи обязательно");

    // Отправка данных на сервер
    await createTask({
      title,
      description,
      deadline,
    });
    // Очистка формы
    setTitle("");
    setDescription("");
    setDeadline("");
  };

  return (
    <form
      onSubmit={handleSubmit}
      className="bg-white p-4 shadow flex flex-col gap-2"
    >
      <h2 className="text-lg font-semibold">Добавить новую задачу</h2>

      {/* Поле заголовка */}
      <input
        className="border p-2 rounded"
        type="text"
        placeholder="Заголовок"
        value={title}
        onChange={(e) => setTitle(e.target.value)}
      />
      {/* Поле описания */}
      <textarea
        className="border p-2 rounded"
        placeholder="Описание"
        value={description}
        onChange={(e) => setDescription(e.target.value)}
      />
      {/* Поле дедлайна */}
      <input
        className="border p-2 rounded"
        type="date"
        value={deadline}
        onChange={(e) => setDeadline(e.target.value)}
      />
      {/* <select
        className="border p-2 rounded"
        value={status}
        onChange={(e) => setStatus(e.target.value)}
      >
        <option value="open">Открыта</option>
        <option value="in_progress">В работе</option>
        <option value="done">Завершена</option>
      </select> */}

      {/* Кнопка отправки */}
      <button
        // className="bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-700"
        className="bg-blue-500 text-white p-2 rounded hover:bg-blue-700 transition-colors duration-300"
        type="submit"
        disabled={isLoading}
      >
        {isLoading ? "Сохраняем..." : "Создать задачу"}
      </button>
    </form>
  );
}
