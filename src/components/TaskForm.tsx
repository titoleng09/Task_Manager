import { useState, type FormEvent } from "react";
import type { Priority, task } from "../type/task";

interface TaskFormProps {
    onCreate: (task: Omit<task, "id">) => Promise<task>;
}

function TaskForm ({ onCreate }: TaskFormProps) {

    const [title, setTitle] = useState("");
    const [description, setDescription] = useState("");
    const [priority, setPriority] = useState<Priority>("medium");
    const [error, setError] = useState("");
    const [isSubmitting, setIsSubmitting] = useState(false);


    const handleSubmit = async (e: FormEvent<HTMLFormElement>) => {
        e.preventDefault();

        if (!title.trim() || isSubmitting) return;

        setError("");
        setIsSubmitting(true);

        try {
            await onCreate({
                title: title.trim(),
                description,
                priority,
                completed: false,
            });

            setTitle("");
            setDescription("");
            setPriority("medium");
        } catch (error) {
            setError(error instanceof Error ? error.message : "Failed to create task.");
        } finally {
            setIsSubmitting(false);
        }
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
                maxLength={30}
                required
                value={title}
                onChange={(e) => setTitle(e.target.value)}
            />

            <textarea
                placeholder="Description"
                className="textarea textarea-bordered w-full"
                value={description}
                onChange={(e) => setDescription(e.target.value)}
            />

            {error && <p className="text-error" role="alert">{error}</p>}

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
                disabled={isSubmitting}
                >
                {isSubmitting ? "Creating..." : "Create Task"}
            </button>

        </div>
    </form>
  );

}

export default TaskForm;
