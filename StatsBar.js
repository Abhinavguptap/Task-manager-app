/* StatsBar.js
 * Displays the completion progress bar and summary counts.
 * Purely presentational — receives all data via props.
 */

function StatsBar({ total, completed }) {
  if (total === 0) return null;

  const percent = Math.round((completed / total) * 100);
  const pending = total - completed;

  return (
    <div className="stats-bar">
      <div className="stats-row">
        <span className="stat">
          <span className="stat-value">{pending}</span> pending
        </span>
        <span className="stat-divider" aria-hidden="true" />
        <span className="stat">
          <span className="stat-value">{completed}</span> completed
        </span>
        <span className="stat-percent">{percent}%</span>
      </div>

      <div className="progress-track" role="progressbar" aria-valuenow={percent} aria-valuemin={0} aria-valuemax={100}>
        <div className="progress-fill" style={{ width: `${percent}%` }} />
      </div>
    </div>
  );
}

export default StatsBar;
