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
      .post("https://8b35-102-89-22-23.ngrok-free.app/tasks", {
        title: newTask,
      })
      .then(() => {
        setNewTask("");
        getAllTask();
      });

    // const lastId = !todoList.length ? 0 : todoList[todoList.length - 1].id;

    // const task: TaskType = {
    //   id: lastId + 1,
    //   title: newTask.trim(),
    //   completed: false,
    // };

    // if (task.title !== "") {
    //   setTodoList([...todoList, task]);
    //   setNewTask("");
    // }
  };

  const deleteTask = (id: number) => {
    axios
      .delete("https://8b35-102-89-22-23.ngrok-free.app/tasks/" + id)
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
      .get("https://8b35-102-89-22-23.ngrok-free.app/tasks/all", {
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
              taskName={task.title}
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
