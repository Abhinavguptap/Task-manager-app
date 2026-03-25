/*
 * TaskItem.js
 * Displays a single task row.
 * If a deadline exists, formats and shows it.
 * Marks as "overdue" if the deadline is in the past and task is not completed.
 */

/* Format a deadline object into a readable string e.g. "Jun 15 · 3:30 PM" */
function formatDeadline({ date, hour, minute, ampm }) {
  if (!date) return null;
  const [year, month, day] = date.split("-").map(Number);
  const dateObj = new Date(year, month - 1, day);
  const monthName = dateObj.toLocaleString("default", { month: "short" });
  return `${monthName} ${day} · ${hour}:${minute} ${ampm}`;
}

/* Returns true if the deadline datetime is before right now */
function isOverdue({ date, hour, minute, ampm }) {
  if (!date) return false;
  const [year, month, day] = date.split("-").map(Number);
  let h = parseInt(hour, 10);
  if (ampm === "PM" && h !== 12) h += 12;
  if (ampm === "AM" && h === 12) h = 0;
  const deadlineDate = new Date(year, month - 1, day, h, parseInt(minute, 10));
  return deadlineDate < new Date();
}

function TaskItem({ task, onToggle, onDelete }) {
  const hasDeadline = !!task.deadline;
  const overdue     = hasDeadline && !task.completed && isOverdue(task.deadline);
  const deadlineStr = hasDeadline ? formatDeadline(task.deadline) : null;

  return (
    <li className={`task-item ${task.completed ? "completed" : ""} ${overdue ? "overdue" : ""}`}>

      {/* Checkbox */}
      <button
        className="checkbox-btn"
        onClick={() => onToggle(task.id)}
        aria-label={task.completed ? "Mark incomplete" : "Mark complete"}
        type="button"
      >
        <span className="checkbox">
          {task.completed && (
            <svg viewBox="0 0 12 10" fill="none" xmlns="http://www.w3.org/2000/svg">
              <path
                d="M1 5L4.5 8.5L11 1"
                stroke="currentColor"
                strokeWidth="2.2"
                strokeLinecap="round"
                strokeLinejoin="round"
              />
            </svg>
          )}
        </span>
      </button>

      {/* Text + deadline */}
      <div className="task-body">
        <span className="task-text">{task.text}</span>
        {deadlineStr && (
          <span className={`task-deadline ${overdue ? "deadline-overdue" : ""}`}>
            {overdue ? (
              /* Overdue warning icon */
              <svg width="11" height="11" viewBox="0 0 16 16" fill="none">
                <circle cx="8" cy="8" r="7" stroke="currentColor" strokeWidth="1.6"/>
                <path d="M8 5v4" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round"/>
                <circle cx="8" cy="11.5" r="0.8" fill="currentColor"/>
              </svg>
            ) : (
              /* Clock icon */
              <svg width="11" height="11" viewBox="0 0 16 16" fill="none">
                <circle cx="8" cy="8" r="7" stroke="currentColor" strokeWidth="1.6"/>
                <path d="M8 5v3.5l2.5 1.5" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round"/>
              </svg>
            )}
            {overdue && !task.completed ? "Overdue · " : ""}{deadlineStr}
          </span>
        )}
      </div>

      {/* Delete */}
      <button
        className="delete-btn"
        onClick={() => onDelete(task.id)}
        aria-label="Delete task"
        type="button"
      >
        <svg width="12" height="12" viewBox="0 0 12 12" fill="none">
          <path d="M1 1L11 11M11 1L1 11" stroke="currentColor" strokeWidth="2" strokeLinecap="round"/>
        </svg>
      </button>

    </li>
  );
}

export default TaskItem;
