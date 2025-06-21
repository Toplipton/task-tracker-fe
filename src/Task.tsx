interface TaskProps {
  id: number;
  taskName: string;
  completed: boolean;
  deleteTask: (id: number) => void;
  completeTask: (id: number) => void;
}

export const Task = ({
  id,
  taskName,
  completed,
  deleteTask,
  completeTask,
}: TaskProps) => {
  return (
    <div className="task-item">
      <input
        type="checkbox"
        checked={completed}
        onChange={() => completeTask(id)}
      />
      <span className={`task-name ${completed ? "completed" : ""}`}>
        {taskName}
      </span>
      <button className="delete-btn" onClick={() => deleteTask(id)}>
        ✕
      </button>
    </div>
  );
};
