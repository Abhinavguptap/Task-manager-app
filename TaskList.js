import TaskItem from "./TaskItem";

/* Empty state messages vary by which filter is active */
const EMPTY_MESSAGES = {
  All:       { icon: "📋", text: "No tasks yet.", sub: "Add your first task above!" },
  Pending:   { icon: "✅", text: "All caught up!", sub: "No pending tasks remaining." },
  Completed: { icon: "🎯", text: "Nothing completed yet.", sub: "Mark a task done to see it here." },
};

function TaskList({ tasks, activeFilter = "All", onToggle, onDelete }) {
  if (tasks.length === 0) {
    const { icon, text, sub } = EMPTY_MESSAGES[activeFilter] || EMPTY_MESSAGES.All;
    return (
      <div className="empty-state">
        <span className="empty-icon">{icon}</span>
        <p className="empty-text">{text}</p>
        <p className="empty-sub">{sub}</p>
      </div>
    );
  }

  return (
    <ul className="task-list">
      {tasks.map((task) => (
        <TaskItem
          key={task.id}
          task={task}
          onToggle={onToggle}
          onDelete={onDelete}
        />
      ))}
    </ul>
  );
}

export default TaskList;
