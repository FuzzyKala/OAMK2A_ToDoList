import React from "react";
import { Task } from "../PropInterface";

interface TaskListProps {
  tasks: Task[];
  deleteTask: (deletedTaskId: number) => void;
}

export default function TaskList({ tasks, deleteTask }: TaskListProps) {
  return (
    <div>
      <ul style={{ paddingLeft: 16 }}>
        {tasks.map((task) => (
          <li key={task.id}>
            {task.description}
            <button
              className="delete-button"
              onClick={() => deleteTask(task.id)}
            >
              Delete
            </button>
          </li>
        ))}
      </ul>
    </div>
  );
}
