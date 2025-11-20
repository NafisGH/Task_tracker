import { useDeleteTaskMutation } from "../features/tasks/tasksApi";
import { Link } from "react-router-dom";

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

  const handleDelete = () => {
    if (confirm("Delete this task?")) {
      deleteTask(task.id);
    }
  };

  return (
    <div className="border p-4 rounded-xl shadow-sm flex flex-col gap-1 bg-white">
      <h3 className="text-xl font-bold">{task.title}</h3>
      <p className="text-gray-600">{task.description}</p>
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
      <button
        className="w-1/3 px-4 py-1 border border-red-500 rounded-lg hover:bg-red-50 text-left"
        onClick={handleDelete}
        disabled={isLoading}
      >
        🗑️ Delete
      </button>
      <Link
        to={`/edit/${task.id}`}
        className="w-1/3 px-4 py-1 border border-red-500 rounded-lg hover:bg-red-50"
      >
        ✏️ Edit task
      </Link>
    </div>
  );
}
