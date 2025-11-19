import { useGetTasksQuery } from "../features/tasks/tasksApi";
import { TaskCard } from "../components/TaskCard";
import { TaskForm } from "../components/TaskForm";
import type { Task } from "../components/TaskCard";
import { useState } from "react";

export default function TasksPage() {
  const {
    data: tasks,
    isLoading,
    error,
  } = useGetTasksQuery(undefined, {
    refetchOnMountOrArgChange: true,
    refetchOnReconnect: true,
  });
  const [statusFilter, setStatusFilter] = useState("Все");

  if (isLoading) {
    return <p>loading...</p>;
  }
  if (error) {
    return <p>Error loading tasks</p>;
  }

  const filteredTasks = tasks?.filter((task) => {
    return statusFilter === "Все" ? true : task.status === statusFilter;
  });
  return (
    <div className="max-w-4xl mx-auto px-4 mt-10">
      <h1 className="text-2xl font-bold mb-4">📋 Task list</h1>

      <TaskForm />
      <div className="mt-5">
        <label className="mr-2 font-medium">Filter by status:</label>
        <select
          className="border p-2 rounded"
          value={statusFilter}
          onChange={(e) => setStatusFilter(e.target.value)}
        >
          <option value="Все">All</option>
          <option value="open">open</option>
          <option value="in_progress">in progress</option>
          <option value="done">done</option>
        </select>
      </div>
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mt-10">
        {filteredTasks?.map((task: Task) => (
          <TaskCard key={task.id} task={task} />
        ))}
      </div>
    </div>
  );
}
