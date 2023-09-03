import axios from "axios"

const api = axios.create({ baseURL: "http://localhost:9000/" });

export const fetchTasks = () => api.get("/tasks");
export const createTask = (newTask) => api.post("/tasks", newTask);
export const deleteTask = (taskId) => api.delete(`/tasks/${taskId}`);