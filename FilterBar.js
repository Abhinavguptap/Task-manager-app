/* FilterBar.js
 * Renders the three filter tabs: All | Pending | Completed
 * Receives the active filter and a setter from App.js via props.
 */

const FILTERS = ["All", "Pending", "Completed"];

function FilterBar({ activeFilter, onFilterChange, counts }) {
  return (
    <div className="filter-bar" role="tablist" aria-label="Filter tasks">
      {FILTERS.map((filter) => (
        <button
          key={filter}
          role="tab"
          aria-selected={activeFilter === filter}
          className={`filter-btn ${activeFilter === filter ? "active" : ""}`}
          onClick={() => onFilterChange(filter)}
        >
          {filter}
          <span className="filter-count">{counts[filter]}</span>
        </button>
      ))}
    </div>
  );
}

export default FilterBar;
