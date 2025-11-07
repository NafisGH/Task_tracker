import { useDeleteTaskMutation } from "../features/tasks/tasksApi";

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
    if (confirm("Вы уверены, что хотите удалить эту задачу?")) {
      deleteTask(task.id);
    }
  };
  // console.log("TaskCard", task);
  return (
    <div className="border p-4 rounded shadow-sm flex flex-col gap-1 bg-white">
      <h3 className="text-xl font-bold">{task.title}</h3>
      <p className="text-gray-600">{task.description}</p>
      <p className="text-sm">
        📅 {new Date(task.deadline).toLocaleDateString()}
      </p>
      <p className="text-sm font-semibold">Статус: {task.status}</p>
      <button
        className="mt-2 text-sm text-red-600 hover:underline"
        onClick={handleDelete}
        disabled={isLoading}
      >
        Удалить
      </button>
    </div>
  );
}
