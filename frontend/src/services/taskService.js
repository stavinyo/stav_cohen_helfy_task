const API_URL = "http://localhost:4000/api/tasks";

const jsonOptions = (method, data) => ({
	method: method,
	headers: { "Content-Type": "application/json" },
	body: JSON.stringify(data),
});

export const taskService = {
	getAllTasks: async () => {
		const response = await fetch(API_URL);
		if (!response.ok) throw new Error("Failed to fetch tasks");
		return response.json();
	},

	createTask: async (taskData) => {
		const response = await fetch(API_URL, jsonOptions("POST", taskData));
		if (!response.ok) throw new Error("Failed to create task");
		return response.json();
	},

	toggleTaskStatus: async (id) => {
		const response = await fetch(`${API_URL}/${id}/toggle`, {
			method: "PATCH",
		});
		if (!response.ok) throw new Error("Failed to update task status");
		return response.json();
	},

	updateTask: async (id, taskData) => {
		const response = await fetch(
			`${API_URL}/${id}`,
			jsonOptions("PUT", taskData),
		);
		if (!response.ok) throw new Error("Failed to update task");
		return response.json();
	},

	deleteTask: async (id) => {
		const response = await fetch(`${API_URL}/${id}`, {
			method: "DELETE",
		});
		if (!response.ok) throw new Error("Failed to delete task");
		return true;
	},
};
