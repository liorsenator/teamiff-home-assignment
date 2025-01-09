import axios from "axios";

const API_URL = "http://localhost:5000/tasks";

// Fetch all tasks
export const getTasks = async () => {
  try {
    const response = await axios.get(API_URL);
    return response.data;
  } catch (error) {
    console.error("Error fetching tasks:", error);
    throw error;
  }
};

// Add a new task
export const addTask = async (task) => {
  try {
    console.log("Sending task data to the backend:", task); 
    const response = await axios.post(`${API_URL}/addTask`, task);
    return response.data;
  } catch (error) {
    console.error("Error adding task:", error);
    throw error;
  }
};

// Fetch a task by ID
export const getTaskById = async (id) => {
  try {
    const response = await axios.get(`${API_URL}/${id}`);
    return response.data; 
  } catch (error) {
    console.error(`Error fetching task with ID ${id}:`, error);
    throw error;
  }
};

// Update an existing task
export const updateTask = async (id, task) => {
  try {
    console.log(`Updating task with ID ${id}:`, task); 
    const response = await axios.put(`${API_URL}/updateTask/${id}`, task);
    return response.data;
  } catch (error) {
    console.error(`Error updating task with ID ${id}:`, error);
    throw error;
  }
};

// Delete a task
export const deleteTask = async (id) => {
  try {
    const response = await axios.delete(`${API_URL}/deleteTask/${id}`);
    return response.data;
  } catch (error) {
    console.error(`Error deleting task with ID ${id}:`, error);
    throw error;
  }
};
