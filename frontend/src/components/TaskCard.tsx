export type Task = {
  id: number;
  title: string;
  description: string;
  status: string;
  deadline: string;
};

export function TaskCard({ task }: { task: Task }) {
  return (
    <div className="border p-4 rounded shadow-sm flex flex-col gap-1 bg-white ">
      <h3 className="text-xl font-bold">{task.title}</h3>
      <p className="text-gray-600">{task.description}</p>
      <p className="text-sm">📅 {task.deadline}</p>
      <p className="text-sm font-semibold">Статус: {task.status}</p>
    </div>
  );
}
