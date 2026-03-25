import { useState } from "react";
import TaskInput from "./TaskInput";
import TaskList from "./TaskList";
import FilterBar from "./FilterBar";
import StatsBar from "./StatsBar";

/*
 * App.js — Root component
 *
 * Owns two pieces of state:
 *   1. tasks       — the master list of task objects
 *   2. activeFilter — which tab is selected ("All" | "Pending" | "Completed")
 *
 * Everything else (filtered list, counts) is derived — no redundant state.
 */

function App() {
  const [tasks, setTasks] = useState([]);
  const [activeFilter, setActiveFilter] = useState("All");

  // ── Derived values (computed from tasks, not stored in state) ──────────
  const completedCount = tasks.filter((t) => t.completed).length;
  const pendingCount   = tasks.length - completedCount;

  // Counts shown as badges on each filter tab
  const counts = {
    All:       tasks.length,
    Pending:   pendingCount,
    Completed: completedCount,
  };

  // The visible subset of tasks based on the active filter
  const filteredTasks = tasks.filter((task) => {
    if (activeFilter === "Completed") return task.completed;
    if (activeFilter === "Pending")   return !task.completed;
    return true; // "All"
  });

  // ── Handlers ───────────────────────────────────────────────────────────

  const handleAddTask = (text, deadline) => {
    const newTask = { id: Date.now(), text, completed: false, deadline };
    setTasks((prev) => [newTask, ...prev]);
    // Always switch to "All" so the user can see the task they just added
    setActiveFilter("All");
  };

  const handleToggleTask = (id) => {
    setTasks((prev) =>
      prev.map((task) =>
        task.id === id ? { ...task, completed: !task.completed } : task
      )
    );
  };

  const handleDeleteTask = (id) => {
    setTasks((prev) => prev.filter((task) => task.id !== id));
  };

  // ── Render ─────────────────────────────────────────────────────────────
  return (
    <div className="page">
      <div className="card">

        {/* ── Header ── */}
        <header className="app-header">
          <div className="header-top">
            <h1 className="app-title">Task Manager</h1>
            {tasks.length > 0 && (
              <span className="header-badge">{tasks.length}</span>
            )}
          </div>
          <p className="app-subtitle">Stay organised, one task at a time.</p>
        </header>

        {/* ── Add task ── */}
        <TaskInput onAdd={handleAddTask} />

        {/* ── Stats + progress (only when tasks exist) ── */}
        <StatsBar total={tasks.length} completed={completedCount} />

        {/* ── Filter tabs (only when tasks exist) ── */}
        {tasks.length > 0 && (
          <FilterBar
            activeFilter={activeFilter}
            onFilterChange={setActiveFilter}
            counts={counts}
          />
        )}

        {/* ── Task list ── */}
        <TaskList
          tasks={filteredTasks}
          activeFilter={activeFilter}
          onToggle={handleToggleTask}
          onDelete={handleDeleteTask}
        />

      </div>
    </div>
  );
}

export default App;
