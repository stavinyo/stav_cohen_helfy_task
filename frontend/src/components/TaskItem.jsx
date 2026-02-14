import React, { useState } from "react";
import "../styles/TaskItem.css";
import { formatDate } from "../utils/functions";

function TaskItem({
	task,
	toggleTask = () => {},
	updateTask = () => {},
	deleteTask = () => {},
	setIsEdit = () => {},
	isEdit = false,
}) {
	const {
		completed = false,
		createdAt,
		description = "",
		id,
		priority,
		title = "",
	} = task;

	const [editTitle, setEditTitle] = useState(title);
	const [editDesc, setEditDesc] = useState(description);

	const handleEditClick = () => {
		if (isEdit) {
			updateTask(id, { title: editTitle, description: editDesc });
		}
		setIsEdit(!isEdit);
	};

	return (
		<div className={`task-item-wrapper ${isEdit ? "is-edit" : ""}`}>
			<div className="top-section">
				{isEdit ? (
					<input
						value={editTitle}
						onChange={(e) => setEditTitle(e.target.value)}
					/>
				) : (
					<>
						<span className="title">{title}</span>
						<span className={`priority ${priority}`}>{priority}</span>
					</>
				)}
			</div>

			<div className="context-section">
				{!isEdit && <span className="date">{formatDate(createdAt)}</span>}

				{isEdit ? (
					<textarea
						value={editDesc}
						onChange={(e) => setEditDesc(e.target.value)}
					/>
				) : (
					<span className="description">{description}</span>
				)}
			</div>

			<div className="actions-section">
				<button
					className={`btn ${isEdit ? "edit" : "not-edit"}`}
					onClick={handleEditClick}>
					{isEdit ? "save" : "edit"}
				</button>

				<button
					className={`btn ${completed ? "done" : "undone"}`}
					onClick={() => toggleTask(id)}>
					{completed ? "done" : "undone"}
				</button>

				<button
					className="btn delete"
					onClick={() => deleteTask(id)}>
					delete
				</button>
			</div>
		</div>
	);
}

export default TaskItem;
