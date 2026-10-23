import './App.css'
import Card from './components/Card.tsx'
import type { task } from "./type/task";
import TaskForm from './components/TaskForm.tsx';
import { useState } from 'react';

const API_BASE_URL = import.meta.env.VITE_API_URL || "http://127.0.0.1:8000";

function App() {

  const [tasks, setTasks] = useState<task[]>([])

  const createTask = async (task: Omit<task, "id">): Promise<task> => {
    const response = await fetch(`${API_BASE_URL}/tasks`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(task),
    });

    if (!response.ok) {
      throw new Error(`Backend request failed (${response.status} ${response.statusText}).`);
    }

    const createdTask: Omit<task, "description"> & { description: string | null } =
      await response.json();
    const normalizedTask: task = {
      ...createdTask,
      description: createdTask.description ?? "",
    };

    setTasks((currentTasks) => [
      ...currentTasks,
      normalizedTask,
    ]);

    return normalizedTask;
  };

  const deleteTask = (id: number) => {
    setTasks((currentTasks) =>
      currentTasks.filter((task) => task.id !== id)
    );
  };

  const editTask = (id: number, updatedTask: Partial<task>) => {
    setTasks((currentTasks) =>
      currentTasks.map((task) =>
        task.id === id
          ? { ...task, ...updatedTask }
          : task
      )
    );
  };


  return (
     <main className="min-h-screen bg-base-200 p-8">

        <h1 className="text-3xl font-bold mb-6 text-center">
          Task Manager
        </h1>

        <div className="w-[800px] mx-auto">

        <TaskForm onCreate={createTask} />

         <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-2">
        {tasks.map((task) => (
          <Card
            key={task.id}
            task={task}
            onDelete={deleteTask}
            onEdit={editTask}
          />
        ))}
    </div>


      </div>
      

    </main>
  )
}

export default App;
