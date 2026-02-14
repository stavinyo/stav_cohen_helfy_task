import React from "react";
import "../styles/TaskFilter.css";

function TaskFilter({ currentFilter, setFilter }) {
	const priorities = ["all", "low", "medium", "high"];

	return (
		<div className="task-filter-wrapper">
			<span className="filter-label">Filter by:</span>
			<div className="filter-buttons">
				{priorities.map((priority) => (
					<button
						key={priority}
						className={`filter-btn ${priority} ${currentFilter === priority ? "active" : ""}`}
						onClick={() => setFilter(priority)}>
						{priority}
					</button>
				))}
			</div>
		</div>
	);
}

export default TaskFilter;
