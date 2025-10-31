import { useGetTasksQuery } from "../features/tasks/tasksApi";
import { TaskCard } from "../components/TaskCard";
import type { Task } from "../components/TaskCard";

export default function TasksPage() {
  const { data: tasks, isLoading, error } = useGetTasksQuery();

  if (isLoading) {
    return <p>Загрузка...</p>;
  }
  if (error) {
    return <p>Ошибка при загрузке задач</p>;
  }

  return (
    <div className="max-w-4xl mx-auto py-8 px-4">
      <h1 className="text-2xl font-bold mb-4">📋 Список задач</h1>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        {tasks?.map((task: Task) => (
          <TaskCard key={task.id} task={task} />
        ))}
      </div>
    </div>
  );
}
