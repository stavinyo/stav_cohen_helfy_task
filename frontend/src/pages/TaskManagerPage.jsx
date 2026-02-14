import React, { useState } from "react";
import { useTaskManager } from "../hooks/useTaskManager";
import "../styles/TaskManagerPage.css";
import TaskList from "../components/TaskList";
import TaskForm from "../components/TaskForm";
import TaskFilter from "../components/TaskFilter";

function TaskManagerPage() {
	const { tasksData, loading, addTask, toggleTask, updateTask, deleteTask } =
		useTaskManager();
	const [filter, setFilter] = useState("all");
	const [isModalOpen, setIsModalOpen] = useState(false);

	const handleAddTask = (newTask) => {
		addTask(newTask);
		setIsModalOpen(false);
	};

	const filteredTasks = tasksData.filter((task) => {
		if (filter === "all") return true;
		return task.priority === filter;
	});

	return (
		<div className="task-manager-page-wrapper">
			<header className="title-wrapper">
				<h1 className="title">Task List</h1>
				<button
					className="open-modal-btn"
					onClick={() => setIsModalOpen(true)}>
					New Task
				</button>
			</header>

			{isModalOpen && (
				<div
					className="modal-overlay"
					onClick={() => setIsModalOpen(false)}>
					<div
						className="modal-content"
						onClick={(e) => e.stopPropagation()}>
						<button
							className="close-btn"
							onClick={() => setIsModalOpen(false)}>
							×
						</button>
						<TaskForm addTask={handleAddTask} />
					</div>
				</div>
			)}

			<TaskFilter
				currentFilter={filter}
				setFilter={setFilter}
			/>

			{loading ? (
				"loading..."
			) : (
				<TaskList
					tasks={filteredTasks}
					toggleTask={toggleTask}
					updateTask={updateTask}
					deleteTask={deleteTask}
				/>
			)}
		</div>
	);
}

export default TaskManagerPage;
