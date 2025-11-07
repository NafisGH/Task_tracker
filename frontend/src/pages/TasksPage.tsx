import { useGetTasksQuery } from "../features/tasks/tasksApi";
import { TaskCard } from "../components/TaskCard";
import { TaskForm } from "../components/TaskForm";
import type { Task } from "../components/TaskCard";

export default function TasksPage() {
  const { data: tasks, isLoading, error } = useGetTasksQuery();
  // console.log(tasks);

  if (isLoading) {
    return <p>Загрузка...</p>;
  }
  if (error) {
    return <p>Ошибка при загрузке задач</p>;
  }

  return (
    <div className="max-w-4xl mx-auto px-4 mt-10">
      <h1 className="text-2xl font-bold mb-4">📋 Список задач</h1>

      <TaskForm />
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mt-10">
        {tasks?.map((task: Task) => (
          <TaskCard key={task.id} task={task} />
        ))}
      </div>
    </div>
  );
}
