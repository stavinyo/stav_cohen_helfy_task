import React, { useState } from "react";
import "../styles/TaskForm.css";

function TaskForm({ addTask }) {
	const [title, setTitle] = useState("");
	const [description, setDescription] = useState("");
	const [priority, setPriority] = useState("low");

	const handleSubmit = (e) => {
		e.preventDefault();
		if (!title.trim()) return alert("enter a title");

		addTask({
			title,
			description,
			priority,
			completed: false,
			createdAt: new Date().toISOString(),
			id: Date.now(),
		});

		setTitle("");
		setDescription("");
		setPriority("low");
	};

	return (
		<form
			className="task-form-wrapper"
			onSubmit={handleSubmit}>
			<div className="input-group">
				<input
					type="text"
					placeholder="title..."
					value={title}
					onChange={(e) => setTitle(e.target.value)}
				/>

				<select
					value={priority}
					onChange={(e) => setPriority(e.target.value)}>
					<option value="low">Low</option>
					<option value="medium">Medium</option>
					<option value="high">High</option>
				</select>
			</div>

			<textarea
				placeholder="Description..."
				value={description}
				onChange={(e) => setDescription(e.target.value)}
			/>

			<button
				type="submit"
				className="btn-add">
				Add Task
			</button>
		</form>
	);
}

export default TaskForm;
