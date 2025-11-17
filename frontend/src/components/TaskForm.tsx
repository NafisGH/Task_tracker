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
  const [task, setTask] = useState<Task>({
    title: "",
    description: "",
    deadline: "",
    status: "",
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

    if (!task.title.trim()) return alert("Name required");

    if (isEdit) {
      console.log("task", task);
      await updateTask({ ...task });
    } else {
      await createTask(task);
      setTask({
        title: "",
        description: "",
        deadline: "",
        status: "",
        id: 0,
      });
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
        id: taskData.id,
      });
    }
  }, [taskData]);

  return (
    <form
      onSubmit={handleSubmit}
      className="bg-white p-4 shadow flex flex-col gap-2"
    >
      <h2 className="text-lg font-semibold">
        {isEdit ? "Edit Task" : "Add New Task"}
      </h2>

      {/* Поле заголовка */}
      <input
        className="border p-2 rounded"
        type="text"
        placeholder="heading"
        value={task.title}
        onChange={(e) => setTask({ ...task, title: e.target.value })}
      />
      {/* Поле описания */}
      <textarea
        className="border p-2 rounded"
        placeholder="description"
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
      {/* Поле Статус */}
      <label className="text-sm font-medium">Status task:</label>
      <select
        className="border p-2 rounded"
        value={task.status}
        onChange={(e) => setTask({ ...task, status: e.target.value })}
      >
        <option value="open">open</option>
        <option value="in_progress">in progress</option>
        <option value="done">done</option>
      </select>

      {/* Кнопка отправки */}
      <button
        className="bg-blue-500 text-white p-2 rounded hover:bg-blue-700 transition-colors duration-300"
        type="submit"
        disabled={isLoading}
      >
        {isLoading
          ? isEdit
            ? "Save..."
            : "Create..."
          : isEdit
          ? "Saving changes"
          : "New Task"}
      </button>
    </form>
  );
}
