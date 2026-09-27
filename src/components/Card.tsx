import type { task } from "../type/task.ts";

interface CardType {
    task : task;
}

function Card({ task }: CardType) {

  return (
    <div className="card bg-white w-96 shadow-sm">
      <div className="card-body text-black">

        <h2 className="card-title text-2xl">
          {task.title}

          {task.completed && (
            <div className="badge badge-success">
              Completed
            </div>
          )}
        </h2>

        <p className="text-base m-1">{task.description}</p>

        <div className="card-actions justify-between items-center">

          <div className="badge badge-outline bg-red-">
            {task.priority}
          </div>

          <div className="flex gap-2">
            <button className="btn btn-sm btn-primary bg-blue-600 text-white">
              Complete
            </button>

            <button className="btn btn-sm btn-error text-white">
              Delete
            </button>
          </div>

        </div>
      </div>
    </div>
  );
}

export default Card;