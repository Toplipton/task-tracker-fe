import "./App.css";
import { useState, useEffect, ChangeEvent } from "react";
import { Task } from "./Task";
import axios from "axios";

interface TaskType {
  id: number;
  title: string;
  completed: boolean;
}

function App() {
  const [todoList, setTodoList] = useState<TaskType[]>([]);
  const [newTask, setNewTask] = useState<string>("");

  const handleChange = (event: ChangeEvent<HTMLInputElement>) => {
    setNewTask(event.target.value);
  };

  const addTask = () => {
    axios
      .post("https://b89b-102-89-68-159.ngrok-free.app/tasks", {
        title: newTask,
      })
      .then(() => {
        setNewTask("");
        getAllTask();
      });
  };

  const deleteTask = (id: number) => {
    axios
      .delete("https://b89b-102-89-68-159.ngrok-free.app/tasks/" + id)
      .then(() => {
        getAllTask();
      });
  };

  const completeTask = (id: number) => {
    setTodoList(
      todoList.map((task) =>
        task.id === id ? { ...task, completed: !task.completed } : task
      )
    );
  };

  const getAllTask = () => {
    axios
      .get("https://b89b-102-89-68-159.ngrok-free.app/tasks/all", {
        headers: {
          "ngrok-skip-browser-warning": "true",
        },
      })
      .then((tasks) => {
        setTodoList(tasks.data);
      });
  };
  useEffect(() => {
    getAllTask();
  }, []);

  //
  return (
    <div className="app-container">
      <div className="task-box">
        <h1 className="title">Task Tracker</h1>
        <div className="add-task">
          <input
            type="text"
            placeholder="Enter a new task"
            value={newTask}
            onChange={handleChange}
          />
          <button onClick={addTask}>Add</button>
        </div>
        <div className="task-list">
          {todoList.map((task) => (
            <Task
              key={task.id}
              id={task.id}
              title={task.title}
              completed={task.completed}
              deleteTask={deleteTask}
              completeTask={completeTask}
            />
          ))}
        </div>
      </div>
    </div>
  );
}

export default App;
