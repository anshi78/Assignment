import axios from "axios";

// This file utilizes the global axios instance configured in AuthContext.js.
// All requests here will automatically attach the JWT bearer token if the user is authenticated.

export const getTasks = async () => {
  const response = await axios.get("/tasks");
  return response.data;
};

export const createTask = async (taskData) => {
  const response = await axios.post("/tasks", taskData);
  return response.data;
};

export const updateTask = async (id, taskData) => {
  const response = await axios.put(`/tasks/${id}`, taskData);
  return response.data;
};

export const deleteTask = async (id) => {
  const response = await axios.delete(`/tasks/${id}`);
  return response.data;
};
