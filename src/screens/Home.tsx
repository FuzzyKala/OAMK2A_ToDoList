import React, { useEffect, useState } from "react";
import "./Home.css";
import axios from "axios";
import TaskList from "../components/TaskList";
import { Task } from "../PropInterface";
import { useUser } from "../context/useUser";

const url = process.env.REACT_APP_URL as string;

function Home() {
  const [task, setTask] = useState<Task>({
    id: 0,
    description: "",
  });
  const [tasks, setTasks] = useState<Task[]>([]);
  const { user } = useUser();
  useEffect(() => {
    axios
      .get(url)
      .then((res) => setTasks(res.data))
      .catch((err) => alert(err.res.data.err ? err.res.data.err : err));
  }, []);

  const addTask = () => {
    const headers = { headers: { Authorization: `Bearer ${user.token}` } };

    if (!task.description.trim()) return;

    axios
      .post(`${url}/create`, { description: task.description }, headers)
      .then((res) => {
        const newTask = { id: res.data.id, description: task.description };
        setTasks([...tasks, newTask]);
        setTask({ id: 0, description: "" });
      })
      .catch((err) => alert(err.res?.data?.err || err.message));
  };

  const deleteTask = (deletedTaskId: number) => {
    const headers = { headers: { Authorization: `Bearer ${user.token}` } };
    axios
      .delete(`${url}/delete/${deletedTaskId}`, headers)
      .then((res) => {
        if (res.status === 200) {
          const withoutRemoved = tasks.filter(
            (task) => task.id !== deletedTaskId
          );
          setTasks(withoutRemoved);
        }
      })
      .catch((err) => alert(err.res?.data?.err || err.message));
  };

  return (
    <div id="container">
      <h3>Todo List</h3>
      <form>
        <input
          type="text"
          value={task.description}
          placeholder="add an new task"
          onChange={(e) =>
            setTask((prev) => ({ ...prev, description: e.target.value }))
          }
          onKeyDown={(e) => {
            if (e.key === "Enter") {
              e.preventDefault();
              addTask();
            }
          }}
        />
      </form>
      <TaskList tasks={tasks} deleteTask={deleteTask} />
    </div>
  );
}

export default Home;
