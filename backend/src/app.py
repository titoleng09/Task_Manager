from fastapi import FastAPI

app = FastAPI()

items = {
    1: {"name": "Wireless Mouse", "price": 29.99},
    2: {"name": "Mechanical Keyboard", "price": 89.50},
    3: {"name": "USB-C Hub", "price": 19.99},
    4: {"name": "HD Monitor", "price": 149.00},
    5: {"name": "Mouse Pad", "price": 12.50},
    6: {"name": "Laptop Stand", "price": 35.00},
    7: {"name": "Webcam", "price": 59.99},
    8: {"name": "Bluetooth Speaker", "price": 45.00},
    9: {"name": "External SSD", "price": 99.99},
    10: {"name": "Desk Lamp", "price": 24.50}
}

@app.get("/")
def read_root():
    return {"message": "Hello World"}


@app.get("/items")
def read_items():
    return {"items": items.values()[1:]}


@app.get("/items/{item_id}")
def read_item(item_id: int, q: str | None = None):
    if(item_id < 0):
        return {"error": "Invalid item_id"}
    return {"item_id": item_id, "q": q}



