from typing import List
from typing import Optional
from sqlalchemy import ForeignKey
from sqlalchemy import String
from sqlalchemy.orm import DeclarativeBase
from sqlalchemy.orm import Mapped
from sqlalchemy.orm import mapped_column
from sqlalchemy.orm import relationship
from enum import Enum
from sqlalchemy import String, Boolean, Enum as SQLAlchemyEnum


class Base(DeclarativeBase):
    pass


class Priority(str, Enum):
    low = "low"
    medium = "medium"
    high = "high"
    
    
class Task(Base):
    __tablename__ = "Task"
    id: Mapped[int] = mapped_column(primary_key=True)
    title: Mapped[str] = mapped_column(String(30))
    description: Mapped[Optional[str]] = mapped_column(String(255), nullable=True)
    completed: Mapped[bool] = mapped_column(Boolean, default=False)
    priority: Mapped[Priority] = mapped_column(
        SQLAlchemyEnum(Priority),
        default=Priority.medium,
        nullable=False
    )

    def __repr__(self) -> str:
        return (
            f"Task(id={self.id!r}, title={self.title!r}, "
            f"priority={self.priority.value!r})"
        )
        
        
task = Task(
    title="Learn FastAPI",
    description="Connect FastAPI to MySQL",
    priority=Priority.high
)

