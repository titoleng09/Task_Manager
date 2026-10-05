from fastapi import FastAPI
from model.BaseModel import Task


app = FastAPI()

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
    return {"tasks": tasks.values()}

@app.post("/tasks")
def create_task(task : Task):
    
    for t in tasks:
        if t["id"] == task.id:
            return {"error": "Task with this ID already exists"}
        else:
            tasks.append(task.model_dump())
             
    return { task }
    
    
    
    

@app.get("/tasks/{task_id}")
def read_item(task_id: int, q: str | None = None):
    if(task_id < 0):
        return {"error": "Invalid task_id"}
    return {"task_id": task_id, "q": q}



