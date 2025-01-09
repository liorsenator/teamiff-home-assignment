import React from "react";
import TaskList from "../components/TaskList";
import { useNavigate } from "react-router-dom";
import "../styles.css"; 

const Home = () => {
  const navigate = useNavigate();
  const handleAddTask = () => {
    navigate("/add");
  };
  return (
    <div className="app">
      <h1>To-Do List</h1>
      <TaskList />
    </div>
  );
};

export default Home;
