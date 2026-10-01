from fastapi import FastAPI

app = FastAPI()

items = []

@app.get("/")
def read_root():
    return {"message": "Hello World"}


@app.get("/reg")
def read_reg():
    return {"message": "Registration endpoint"}


@app.get("/items/{item_id}")
def read_item(item_id: int, q: str | None = None):
    if(item_id < 0):
        return {"error": "Invalid item_id"}
    return {"item_id": item_id, "q": q}
