import './App.css'
import Card from './components/Card.tsx'
import type { task } from "./types/task.ts";
import TaskForm from './components/TaskForm.tsx';
import { useState } from 'react';

function App() {

  const [tasks, setTasks] = useState<task[]>([
     {
      id: 1,
      title: "Learn TypeScript",
      description: "Study interfaces",
      priority: "high",
      completed: false
    },
    {
      id: 2,
      title: "Build Task Manager",
      description: "Create React UI",
      priority: "medium",
      completed: false
    }

    
  ])

  const createTask = (task: task) => {
    setTasks((currentTasks) => [
      ...currentTasks,
      task
    ]);


  return (
     <main className="min-h-screen bg-base-200 p-8">

        <TaskForm/>

        <h1 className="text-3xl font-bold mb-6 text-center">
          Task Manager
        </h1>

        <div className="max-w-4xl mx-auto">

        <TaskForm onCreate={createTask} />

        <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">

          {tasks.map((task) => (
            <Card
              key={task.id}
              task={task}
            />
          ))}

        </div>

      </div>

    </main>
  )
}
}

export default App;
