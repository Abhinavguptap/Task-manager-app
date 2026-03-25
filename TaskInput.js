import { useState } from "react";

/* Returns today's date string in YYYY-MM-DD format for the min attribute */
function getTodayString() {
  const d = new Date();
  const yyyy = d.getFullYear();
  const mm   = String(d.getMonth() + 1).padStart(2, "0");
  const dd   = String(d.getDate()).padStart(2, "0");
  return `${yyyy}-${mm}-${dd}`;
}

function TaskInput({ onAdd }) {
  const [text,    setText]    = useState("");
  const [date,    setDate]    = useState("");
  const [hour,    setHour]    = useState("12");
  const [minute,  setMinute]  = useState("00");
  const [ampm,    setAmpm]    = useState("AM");
  const [error,   setError]   = useState("");
  const [shaking, setShaking] = useState(false);

  const triggerShake = () => {
    setShaking(true);
    setTimeout(() => setShaking(false), 450);
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    if (text.trim() === "") {
      setError("Please enter a task name.");
      triggerShake();
      return;
    }

    // Build deadline string — only if date was filled in
    let deadline = null;
    if (date) {
      deadline = { date, hour, minute, ampm };
    }

    onAdd(text.trim(), deadline);

    // Reset all fields
    setText("");
    setDate("");
    setHour("12");
    setMinute("00");
    setAmpm("AM");
    setError("");
  };

  /* Hour options 1–12 */
  const hours = Array.from({ length: 12 }, (_, i) =>
    String(i + 1).padStart(2, "0")
  );

  /* Minute options: 00, 05, 10 … 55 */
  const minutes = Array.from({ length: 12 }, (_, i) =>
    String(i * 5).padStart(2, "0")
  );

  return (
    <form
      className={`task-input-form ${shaking ? "shake" : ""}`}
      onSubmit={handleSubmit}
    >
      {/* ── Row 1: task name + add button ── */}
      <div className="input-row">
        <input
          type="text"
          className={`task-input ${error ? "input-error" : ""}`}
          placeholder="What needs to be done?"
          value={text}
          onChange={(e) => {
            setText(e.target.value);
            if (error) setError("");
          }}
        />
        <button type="submit" className="add-btn">
          + Add
        </button>
      </div>

      {/* ── Row 2: deadline date + time ── */}
      <div className="deadline-row">
        {/* Calendar icon label */}
        <span className="deadline-label">
          <svg width="13" height="13" viewBox="0 0 16 16" fill="none">
            <rect x="1" y="3" width="14" height="12" rx="2" stroke="currentColor" strokeWidth="1.5"/>
            <path d="M1 7h14" stroke="currentColor" strokeWidth="1.5"/>
            <path d="M5 1v3M11 1v3" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round"/>
          </svg>
          Deadline
        </span>

        {/* Date picker */}
        <input
          type="date"
          className="deadline-date"
          value={date}
          min={getTodayString()}
          onChange={(e) => setDate(e.target.value)}
        />

        {/* Time — hour */}
        <select
          className="time-select"
          value={hour}
          onChange={(e) => setHour(e.target.value)}
          aria-label="Hour"
        >
          {hours.map((h) => (
            <option key={h} value={h}>{h}</option>
          ))}
        </select>

        <span className="time-colon">:</span>

        {/* Time — minute */}
        <select
          className="time-select"
          value={minute}
          onChange={(e) => setMinute(e.target.value)}
          aria-label="Minute"
        >
          {minutes.map((m) => (
            <option key={m} value={m}>{m}</option>
          ))}
        </select>

        {/* AM / PM toggle */}
        <div className="ampm-toggle">
          {["AM", "PM"].map((period) => (
            <button
              key={period}
              type="button"
              className={`ampm-btn ${ampm === period ? "active" : ""}`}
              onClick={() => setAmpm(period)}
            >
              {period}
            </button>
          ))}
        </div>
      </div>

      {error && <p className="error-msg">⚠ {error}</p>}
    </form>
  );
}

export default TaskInput;
