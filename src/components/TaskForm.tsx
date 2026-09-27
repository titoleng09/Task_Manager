import { useState, type FormEvent } from "react";
import type { Priority, task } from "../type/task";

interface TaskFormProps {
    onCreate : (task : task ) => void
}

function TaskForm ({ onCreate }: TaskFormProps) {

    let id = 0
    const [title, setTitle] = useState("");
    const [description, setDescription] = useState("");
    const [priority, setPriority] = useState<Priority>("medium");


    const handleSubmit = (e: FormEvent<HTMLFormElement>) => {
        e.preventDefault();

        if (!title.trim()) return;

        const newTask: task = {
        id : id++,
        title,
        description,
        priority,
        completed: false
        };

        onCreate(newTask);

        setTitle("");
        setDescription("");
        setPriority("medium");
    };


    return (
        <form
        onSubmit={handleSubmit}
        className="card bg-base-100 shadow-sm mb-8"
        >
        <div className="card-body">

            <h2 className="card-title">
            Create Task
            </h2>

            <input
                type="text"
                placeholder="Task title"
                className="input input-bordered w-full"
                value={title}
                onChange={(e) => setTitle(e.target.value)}
            />

            <textarea
                placeholder="Description"
                className="textarea textarea-bordered w-full"
                value={description}
                onChange={(e) => setDescription(e.target.value)}
            />

            <select
                className="select select-bordered w-full"
                value={priority}
                onChange={(e) =>
                    setPriority(e.target.value as Priority)
                }
            >
                <option value="low">Low</option>
                <option value="medium">Medium</option>
                <option value="high">High</option>
            </select>

            <button
                type="submit"
                className="btn btn-primary mt-4"
                >
                Create Task
            </button>

        </div>
    </form>
  );

}

export default TaskForm;

