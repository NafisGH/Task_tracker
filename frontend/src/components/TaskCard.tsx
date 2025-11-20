import { useDeleteTaskMutation } from "../features/tasks/tasksApi";
import { Link } from "react-router-dom";
import { ConfirmModal } from "./ConfirmModal";
import { useState } from "react";

export type Task = {
  id: number;
  title: string;
  description: string;
  status: string;
  deadline: string;
  priority: string;
};

export function TaskCard({ task }: { task: Task }) {
  const [deleteTask, { isLoading }] = useDeleteTaskMutation();
  const [isModalOpen, setModalOpen] = useState<boolean>();

  const handleDelete = () => {
    setModalOpen(true);
  };
  const confirmDelete = () => {
    deleteTask(task.id);
    setModalOpen(false);
  };

  return (
    <>
      {/* Модалка */}
      {isModalOpen && (
        <ConfirmModal
          title="Delete Task"
          message="Are you sure you want to delete this task?"
          onConfirm={confirmDelete}
          onCancel={() => setModalOpen(false)}
        />
      )}

      {/* Карточка задачи */}
      <div className="border p-4 rounded-xl shadow-sm flex flex-col gap-2 bg-white">
        <h3 className="text-xl font-bold">{task.title}</h3>

        <p className="text-gray-600">{task.description}</p>

        {/* Дедлайн с подсветкой */}
        <p
          className={`text-sm ${
            new Date(task.deadline) < new Date()
              ? "text-red-600 font-semibold"
              : ""
          }`}
        >
          📅 {new Date(task.deadline).toLocaleDateString()}
        </p>

        <p className="text-sm font-semibold">Status: {task.status}</p>

        {/* Приоритет */}
        <p
          className={`text-sm font-semibold ${
            task.priority === "high"
              ? "text-red-600"
              : task.priority === "medium"
              ? "text-yellow-600"
              : "text-green-600"
          }`}
        >
          Priority: {task.priority}
        </p>

        {/* Кнопка удалить */}
        <button
          className="w-1/3 px-4 py-1 border border-red-500 rounded-lg hover:bg-red-50 text-left"
          onClick={handleDelete}
          disabled={isLoading}
        >
          🗑️ Delete
        </button>

        {/* Кнопка редактировать */}
        <Link
          to={`/edit/${task.id}`}
          className="w-1/3 px-4 py-1 border border-blue-500 rounded-lg hover:bg-blue-50"
        >
          ✏️ Edit task
        </Link>
      </div>
    </>
  );
}
