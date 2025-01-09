import React, { useState, useEffect } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { getTaskById, updateTask } from "../services/taskService";
import TaskForm from "../components/TaskForm";

const EditTask = () => {
  const { id } = useParams(); // Extract task ID from the URL
  const [task, setTask] = useState(null);
  const navigate = useNavigate();

  useEffect(() => {
    const fetchTask = async () => {
      try {
        console.log("Fetching task with ID:", id); 
        const taskData = await getTaskById(id);
        console.log("Fetched task data:", taskData); 
        setTask(taskData);
      } catch (error) {
        console.error("Error fetching task:", error);
        alert("Failed to fetch task data. Please try again.");
      }
    };

    fetchTask();
  }, [id]);

  const handleSubmit = async (updatedTask) => {
    try {
      console.log("Updating task with data:", updatedTask); 
      await updateTask(id, updatedTask);
      alert("Task updated successfully!");
      navigate("/"); 
    } catch (error) {
      console.error("Error updating task:", error);
      alert("Failed to update task. Please try again.");
    }
  };

  if (!task) {
    return <div>Loading...</div>; 
  }

  return (
    <div className="container">
      <h1>Edit Task</h1>
      <TaskForm
        onSubmit={handleSubmit}
        initialValues={{
          title: task.title,
          description: task.description,
          due_date: task.due_date, 
          assigned_user_id: task.assigned_user_id,
          priority_id: task.priority_id,
          status_id: task.status_id,
        }}
      />
        <button className="cancel" onClick={() => navigate("/")}>Cancel</button>
    </div>
  );
};

export default EditTask;