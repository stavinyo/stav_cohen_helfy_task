
import React, { useCallback } from "react";
import { useState, useEffect } from "react";
import { taskService } from "../services/taskService";

export function useTaskManager() {
	const [tasksData, setTasksData] = useState([]);
	const [error, setError] = useState(null);
	const [loading, setLoading] = useState(false);

	const fetchTasks = useCallback(async () => {
		setLoading(true);
		try {
			const tasksRes = await taskService.getAllTasks();
			setTasksData(tasksRes);
		} catch (err) {
			setError(err.message);
		} finally {
			setLoading(false);
		}
	},[]);

	useEffect(() => {
		fetchTasks();
	}, [fetchTasks]);

	const addTask = async (task) => {
		setLoading(true);
		try {
			const newTask = await taskService.createTask(task);
			setTasksData((prev) => [...prev, newTask]);
		} catch (err) {
			setError(err.message);
		} finally {
			setLoading(false);
		}
	};

	const toggleTask = async (id) => {
		try {
			const updatedTask = await taskService.toggleTaskStatus(id);
			setTasksData((prev) => prev.map((t) => (t.id === id ? updatedTask : t)));
		} catch (err) {
			setError(err.message);
		}
	};

	const updateTask = async (id, taskData) => {
		setLoading(true);
		try {
			const updatedTask = await taskService.updateTask(id, taskData);
			setTasksData((prev) => prev.map((t) => (t.id === id ? updatedTask : t)));
		} catch (err) {
			setError(err.message);
		} finally {
			setLoading(false);
		}
	};

	const deleteTask = async (id) => {
		try {
			await taskService.deleteTask(id);
			setTasksData((prev) => prev.filter((t) => t.id !== id));
		} catch (err) {
			setError(err.message);
		}
	};

	return {
        //data
		tasksData,

        //flags
		loading,
		error,

        //functions
		fetchTasks,
		addTask,
		toggleTask,
		updateTask,
		deleteTask,
	};
}
