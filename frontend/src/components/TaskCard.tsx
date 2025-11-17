import { useDeleteTaskMutation } from "../features/tasks/tasksApi";
import { Link } from "react-router-dom";

export type Task = {
  id: number;
  title: string;
  description: string;
  status: string;
  deadline: string;
};

export function TaskCard({ task }: { task: Task }) {
  const [deleteTask, { isLoading }] = useDeleteTaskMutation();

  const handleDelete = () => {
    if (confirm("Delete this task?")) {
      deleteTask(task.id);
    }
  };

  return (
    <div className="border p-4 rounded shadow-sm flex flex-col gap-1 bg-white">
      <h3 className="text-xl font-bold">{task.title}</h3>
      <p className="text-gray-600">{task.description}</p>
      <p className="text-sm">
        📅 {new Date(task.deadline).toLocaleDateString()}
      </p>
      <p className="text-sm font-semibold">Status: {task.status}</p>
      <button
        className="mt-2 text-sm text-red-600 hover:underline"
        onClick={handleDelete}
        disabled={isLoading}
      >
        🗑️ Delete
      </button>
      <Link
        to={`/edit/${task.id}`}
        className="text-sm text-blue-600 hover:underline"
      >
        ✏️ Edit task
      </Link>
    </div>
  );
}
