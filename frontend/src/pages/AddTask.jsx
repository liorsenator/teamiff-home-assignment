import React from "react";
import TaskForm from "../components/TaskForm";
import { addTask } from "../services/taskService";
import { useNavigate } from "react-router-dom";

const AddTask = () => {
  const navigate = useNavigate();

  const handleSubmit = async (taskData) => {
    console.log("Task Data Before Adding task_id:", taskData);

    // Add or auto-generate task_id if not present
    const taskWithId = {
      ...taskData,
      task_id: taskData.task_id || Math.floor(Math.random() * 1000000), 
    };

    console.log("Task Data to Send with task_id:", taskWithId);

    try {
      await addTask(taskWithId); 
      navigate("/"); 
    } catch (error) {
      console.error("Error adding task:", error);
      alert("Failed to add task. Please try again.");
    }
  };

  return (
    <div className="container">
      <h1>Add Task</h1>
      <TaskForm onSubmit={handleSubmit} />
      <button className="cancel" onClick={() => navigate("/")}>Back to Task List</button>
    </div>
  );
};

export default AddTask;
