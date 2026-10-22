
from enum import Enum

from pydantic import BaseModel, ConfigDict, Field


class Priority(str, Enum):
    low = "low"
    medium = "medium"
    high = "high"


class TaskCreate(BaseModel):
    title: str = Field(min_length=1, max_length=30)
    description: str | None = None
    completed: bool = False
    priority: Priority = Priority.medium


class TaskUpdate(BaseModel):
    title: str | None = Field(default=None, min_length=1, max_length=30)
    description: str | None = None
    completed: bool | None = None
    priority: Priority | None = None


class TaskResponse(BaseModel):
    id: int
    title: str
    description: str | None
    completed: bool
    priority: Priority

    model_config = ConfigDict(from_attributes=True)
