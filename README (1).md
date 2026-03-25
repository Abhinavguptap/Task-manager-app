# Task Manager — React To-Do App (v2)

A clean, beginner-friendly Task Manager built with React functional components and hooks.

---

## Folder Structure

```
task-manager/
├── public/
│   └── index.html               # HTML entry point
├── src/
│   ├── components/
│   │   ├── FilterBar.js         # All / Pending / Completed tab switcher
│   │   ├── StatsBar.js          # Progress bar + completion counts
│   │   ├── TaskInput.js         # Add task form with validation
│   │   ├── TaskItem.js          # Single task row
│   │   └── TaskList.js          # List renderer + empty state
│   ├── App.js                   # Root — owns all state & handlers
│   ├── App.css                  # All styles (CSS variables, responsive)
│   └── index.js                 # React entry point
├── package.json
└── README.md
```

---

## How to Run

```bash
cd task-manager
npm install
npm start
```
Open `http://localhost:3000`.

---

## What's New in v2

| Feature | Detail |
|---|---|
| Task filters | All / Pending / Completed tabs with live counts |
| Smart empty states | Each filter shows a context-specific message |
| StatsBar component | Dedicated progress bar + pending/completed counts |
| Improved spacing | Consistent 8px scale via CSS variables |
| Cleaner delete UX | Delete button revealed on row hover |
| Header badge | Total task count shown next to title |
| Auto-switch filter | Adding a task always switches back to "All" |

---

## How State Management Works

### Two pieces of state in App.js

```js
const [tasks, setTasks]             = useState([]);        // master list
const [activeFilter, setActiveFilter] = useState("All");   // current tab
```

### Everything else is derived

```js
const completedCount = tasks.filter(t => t.completed).length;  // no extra state
const pendingCount   = tasks.length - completedCount;           // computed

const filteredTasks = tasks.filter(task => {
  if (activeFilter === "Completed") return task.completed;
  if (activeFilter === "Pending")   return !task.completed;
  return true;
});
```

This is **derived state** — never duplicating data, always computing from the source.

### One-way data flow

```
App.js  [tasks, activeFilter]
   │
   ├── TaskInput   ← onAdd callback
   ├── StatsBar    ← total, completed (read-only)
   ├── FilterBar   ← activeFilter + onFilterChange
   └── TaskList    ← filteredTasks + onToggle/onDelete
         └── TaskItem
```

Data flows **down** via props. Events flow **up** via callbacks. App.js is always the single source of truth.

---

## React Concepts Demonstrated

| Concept | Where |
|---|---|
| `useState` | tasks + activeFilter in App.js; text/error in TaskInput |
| Lifting state up | All state in App.js, shared across 4+ components |
| Derived state | filteredTasks, counts computed — not stored |
| Conditional rendering | Header badge, StatsBar, FilterBar, EmptyState |
| Functional updates | `setTasks(prev => ...)` in all handlers |
| Props & callbacks | Clean parent→child data, child→parent events |
| List rendering | `.map()` with stable `key` prop |
| Input validation | Empty-string guard in TaskInput |
| Accessibility | `aria-label`, `role="tab"`, `aria-selected`, `role="progressbar"` |
