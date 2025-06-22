interface TaskProps {
  id: number;
  title: string;
  completed: boolean;
  deleteTask: (id: number) => void;
  completeTask: (id: number) => void;
}

export const Task = ({
  id,
  title,
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
        {title}
      </span>
      <button className="delete-btn" onClick={() => deleteTask(id)}>
        ✕
      </button>
    </div>
  );
};
