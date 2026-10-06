from fastapi import FastAPI, HTTPException
from model.BaseModel import Task
from fastapi.middleware.cors import CORSMiddleware
from dotenv import load_dotenv
import os

load_dotenv()
app = FastAPI()
origins = [
    os.getenv("FRONTEND_URL"),
]

app.add_middleware(
    CORSMiddleware,
    allow_origins=origins,
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)


tasks = [
    {
        "id": 1,
        "title": "Learn TypeScript",
        "description": "Study interfaces",
        "priority": "high",
        "completed": False
    },
    {
        "id": 2,
        "title": "Build Task Manager",
        "description": "Create React UI",
        "priority": "medium",
        "completed": False
    }
]

@app.get("/")
def read_root():
    return {"message": "Hello World"}

@app.get("/health")
async def health_check():
    return {"status": "healthy", "service": "TaskManager API"}


@app.get("/tasks")
def read_tasks():
    return {"tasks": tasks}

@app.post("/tasks")
def create_task(task : Task):
    
    for t in tasks:
        if t["id"] == task.id:
            return {"error": "Task with this ID already exists"}
        else:
            tasks.append(task.model_dump())
             
    return task

@app.patch("/tasks/{task_id}")
def update_task(task_id : int, task : Task):
        
    for t in tasks:
        if t.task_id == task.id:
            return {"error": "Task with this ID already exists"}
        else:
            tasks.append(task.model_dump())
             
    return task

    

@app.get("/tasks/{task_id}")
def read_item(task_id: int, q: str | None = None):
    if task_id >= len(tasks):
        raise HTTPException(status_code=404, detail="Task not found")

    return {"task_id": task_id, "q": q, "task": tasks[task_id]}



