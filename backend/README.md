# Task Manager API

This is the FastAPI backend for Task Manager. It uses MySQL through SQLAlchemy.

## Requirements

- Python 3.14 or newer
- [uv](https://docs.astral.sh/uv/)
- A running MySQL server and an existing database for the app

## Configure the database

From the `backend` directory, create a `.env` file with your MySQL connection
details and the frontend origin allowed by CORS:

```dotenv
DB_USER=your_mysql_user
DB_PASSWORD=your_mysql_password
DB_HOST=localhost
DB_PORT=3306
DB_NAME=your_database_name
FRONTEND_URL=http://localhost:5173
```

The database named by `DB_NAME` must already exist. Keep real credentials in
your local `.env` file and do not commit them.

## Install and run

From the `backend` directory:

```bash
uv sync
uv run uvicorn main:app --reload
```

`main.py` imports the FastAPI application from `src/app.py`, so the Uvicorn
target is `main:app`. The API will be available at <http://127.0.0.1:8000>.

## Check the API

- Health check: <http://127.0.0.1:8000/health>
- Interactive API documentation: <http://127.0.0.1:8000/docs>
- Tasks endpoint: <http://127.0.0.1:8000/tasks>