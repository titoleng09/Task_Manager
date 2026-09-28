import type { task } from "../type/task.ts";
import { useState } from "react";

interface CardType {
    task : task;
    onDelete: (id : number) => void;
    onEdit: (id: number, updatedTask: Partial<task>) => void;
}


function Card({ task, onDelete, onEdit }: CardType) {
  const [isEditing, setIsEditing] = useState(false);
  const [title, setTitle] = useState(task.title);
  const [description, setDescription] = useState(task.description);
  const [priority, setPriority] = useState(task.priority);

  const handleSave = () => {
    if (!title.trim()) return;

    onEdit(task.id, {
      title: title.trim(),
      description,
      priority,
    });
    setIsEditing(false);
  };

  return (
    <div className="card bg-white w-96 shadow-sm">
      <div className="card-body text-black">
        {isEditing ? (
          <div className="space-y-3">
            <input
              className="input input-bordered w-full text-white"
              value={title}
              onChange={(event) => setTitle(event.target.value)}
            />
            <textarea
              className="textarea textarea-bordered w-full text-white"
              value={description}
              onChange={(event) => setDescription(event.target.value)}
            />
            <select
              className="select select-bordered w-full text-white"
              value={priority}
              onChange={(event) => setPriority(event.target.value as task["priority"])}
            >
              <option value="low">Low</option>
              <option value="medium">Medium</option>
              <option value="high">High</option>
            </select>
          </div>
        ) : (
          <>
            <h2 className="card-title text-2xl">
              {task.title}

              {task.completed && (
                <div className="badge badge-success">
                  Completed
                </div>
              )}
            </h2>

            <p className="text-base m-1">{task.description}</p>
          </>
        )}

        <div className="card-actions justify-between items-center">

          <div className="badge badge-outline bg-red-">
            {isEditing ? priority : task.priority}
          </div>

          <div className="flex gap-2">
            {isEditing ? (
              <>
                <button className="btn btn-sm btn-primary" onClick={handleSave}>
                  Save
                </button>
                <button className="btn btn-sm" onClick={() => setIsEditing(false)}>
                  Cancel
                </button>
              </>
            ) : (
              <button className="btn btn-sm btn-primary" onClick={() => setIsEditing(true)}>
                Edit
              </button>
            )}

            <button className="btn btn-sm btn-error text-white" onClick={() => onDelete(task.id)}>
              Delete
            </button>
          </div>

        </div>
      </div>
    </div>
  );
}

export default Card;