import React, { useState } from "react";
import "./App.css";

function App() {
  const [task, setTask] = useState<string>("");
  const [tasks, setTasks] = useState<string[]>([]);
  const addTask = () => {
    setTasks([...tasks, task]);
    setTask("");
  };
  const deleteTask = (deletedTask: string) => {
    const withoutRemoved = tasks.filter((task) => task !== deletedTask);
    setTasks(withoutRemoved);
  };
  return (
    <div id="container">
      <h3>Todo List</h3>
      <form>
        <input
          type="text"
          value={task}
          placeholder="add an new task"
          onChange={(e) => setTask(e.target.value)}
          onKeyDown={(e) => {
            if (e.key === "Enter") {
              e.preventDefault();
              addTask();
            }
          }}
        />
      </form>
      <ul>
        {tasks.map((task, i) => (
          <li key={i}>
            {task}
            <button className="delete-button" onClick={() => deleteTask(task)}>
              Delete
            </button>
          </li>
        ))}
      </ul>
    </div>
  );
}

export default App;
