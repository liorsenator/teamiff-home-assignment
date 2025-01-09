import React, { useEffect, useState } from "react";
import { getTasks,deleteTask,updateTask } from "../services/taskService";
import { useNavigate } from "react-router-dom";
import "../styles.css";

const TaskList = () => {
  const [tasks, setTasks] = useState([]);
  const navigate = useNavigate();

  useEffect(() => {
    const fetchTasks = async () => {
      try {
        const fetchedTasks = await getTasks();
        console.log("Fetched tasks:", fetchedTasks);
        setTasks(fetchedTasks);
    } catch (error) {
      console.error("Error fetching tasks:", error);
    }
  };

  fetchTasks();
}, []);

  const handleDelete = async(id) => {
    if (window.confirm("Are you sure you want to delete this task?")) {
    try {
      await deleteTask(id); 
      window.location.reload();
      setTasks((prevTasks) => prevTasks.filter((task) => task_id !== id));
    } catch (error) {
      console.error('Error deleting task with ID ${id}:', error);
      alert("Failed to delete the task. Please try again.");
    }
  }
};

    const handleEdit = (id) => {
      navigate(`/editTask/${id}`);
    };
    
  return (
    <div className="container">
      <button className="add-task-button" onClick={() => navigate("/add")}> + Add Task</button>
        {tasks.map((task) => (
          <div key={task._id} className="task">
            <div className="task-details">
            <h2>{task.title}</h2>
            <p>{task.description}</p>
            <p>Due Date: {new Date(task.due_date).toLocaleDateString()}</p>
            <p>Priority: {task.priority_id}</p>
            <p>Status: {task.status_id}</p>
            <p>Assigned User ID: {task.assigned_user_id || "N/A"}</p>
            </div>
            <div className="task-actions">
              <button className="edit" onClick={() => handleEdit(task._id)}>Edit</button>
              <button className="delete" onClick={() => handleDelete(task._id)}>Delete</button>
          </div>
    </div>
        ))}
        </div>
  );
};

export default TaskList;