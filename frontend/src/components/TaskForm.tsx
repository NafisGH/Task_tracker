import { useEffect, useState } from "react";
import {
  useCreateTaskMutation,
  useGetTaskByIdQuery,
  useUpdateTaskMutation,
} from "../features/tasks/tasksApi";
import { useParams } from "react-router-dom";
import type { Task } from "./TaskCard";
import { useNavigate } from "react-router-dom";

export function TaskForm() {
  // const [title, setTitle] = useState("");
  // const [description, setDescription] = useState("");
  // const [deadline, setDeadline] = useState("");
  // const [status, setStatus] = useState("open");
  const [task, setTask] = useState<Task>({
    title: "",
    description: "",
    deadline: "",
    status: "open",
    id: 0, // временно, если создаём новую задачу
  });

  const { id } = useParams<{ id: string }>();
  const isEdit = Boolean(id);
  const navigate = useNavigate();

  // Получение задачи по id при редактировании
  const { data: taskData } = useGetTaskByIdQuery(id!, {
    skip: !isEdit, // Пропускаем запрос, если не в режиме редактирования
  });
  // Мутация для создания задачи
  const [createTask, { isLoading }] = useCreateTaskMutation();
  const [updateTask] = useUpdateTaskMutation();
  // const isLoading = isLoading || isLoading;

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    if (!task.title.trim()) return alert("Название обязательно");

    if (isEdit) {
      console.log("task", task);
      await updateTask({ ...task });
    } else {
      await createTask(task);
    }

    navigate("/");
  };

  useEffect(() => {
    if (taskData) {
      setTask({
        title: taskData.title,
        description: taskData.description,
        deadline: taskData.deadline,
        status: taskData.status,
        id: taskData.id, // Add this line
      });
    }
  }, [taskData]);

  // Обработка отправки задачи
  // const handleSubmit = async (e: React.FormEvent) => {
  //   e.preventDefault();

  //   // Валидация
  //   if (!title.trim()) return alert("Название задачи обязательно");

  //   // Отправка данных на сервер
  //   await createTask({
  //     title,
  //     description,
  //     deadline,
  //   });
  //   // Очистка формы
  //   setTitle("");
  //   setDescription("");
  //   setDeadline("");
  // };

  return (
    <form
      onSubmit={handleSubmit}
      className="bg-white p-4 shadow flex flex-col gap-2"
    >
      <h2 className="text-lg font-semibold">
        {isEdit ? "Редактировать задачу" : "Добавить новую задачу"}
      </h2>

      {/* Поле заголовка */}
      <input
        className="border p-2 rounded"
        type="text"
        placeholder="Заголовок"
        value={task.title}
        onChange={(e) => setTask({ ...task, title: e.target.value })}
      />
      {/* Поле описания */}
      <textarea
        className="border p-2 rounded"
        placeholder="Описание"
        value={task.description}
        onChange={(e) => setTask({ ...task, description: e.target.value })}
      />
      {/* Поле дедлайна */}
      <input
        className="border p-2 rounded"
        type="date"
        value={task.deadline}
        onChange={(e) => setTask({ ...task, deadline: e.target.value })}
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
        {isLoading
          ? isEdit
            ? "Сохраняем..."
            : "Создаем..."
          : isEdit
          ? "Сохраняем изменения"
          : "Создать задачу"}
      </button>
    </form>
  );
}
