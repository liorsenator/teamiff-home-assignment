import React, { useState } from "react";

const TaskForm = ({ onSubmit }) => {
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [dueDate, setDueDate] = useState("");
  const [assignedUserId, setAssignedUserId] = useState("");
  const [priorityId, setPriorityId] = useState(1);
  const [statusId, setStatusId] = useState(1);
  const [errors, setErrors] = useState({});

  const validate = () => {
    const errors = {};

    // Validation Tests
    if (!title || title.trim() === "") {
      errors.title = "Title is required.";
    }

    if (!description || description.trim() === "") {
      errors.description = "Description is required.";
    }

    if (!dueDate) {
      errors.dueDate = "Due Date is required.";
    } else if (new Date(dueDate) < new Date()) {
      errors.dueDate = "Due Date cannot be in the past.";
    }

    if (!assignedUserId) {
      errors.assignedUserId = "Assigned User ID is required.";
    } else if (isNaN(assignedUserId) || parseInt(assignedUserId, 10) <= 0) {
      errors.assignedUserId = "Assigned User ID must be a positive number.";
    }

    setErrors(errors);
    return Object.keys(errors).length === 0;
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    // Run validation
    if (!validate()) {
      return;
    }

    const task = {
      title,
      description,
      due_date: dueDate,
      assigned_user_id: parseInt(assignedUserId, 10),
      priority_id: parseInt(priorityId, 10),
      status_id: parseInt(statusId, 10),
    };

    onSubmit(task); // Pass task to the parent component
  };

  return (
    <form onSubmit={handleSubmit}>
      <div>
        <label>Title:</label>
        <input
          type="text"
          value={title}
          onChange={(e) => setTitle(e.target.value)}
        />
        {errors.title && <p style={{ color: "red" }}>{errors.title}</p>}
      </div>
      <div>
        <label>Description:</label>
        <textarea
          value={description}
          onChange={(e) => setDescription(e.target.value)}
        />
        {errors.description && <p style={{ color: "red" }}>{errors.description}</p>}
      </div>
      <div>
        <label>Due Date:</label>
        <input
          type="date"
          value={dueDate}
          onChange={(e) => setDueDate(e.target.value)}
        />
        {errors.dueDate && <p style={{ color: "red" }}>{errors.dueDate}</p>}
      </div>
      <div>
        <label>Assigned User ID:</label>
        <input
          type="number"
          value={assignedUserId}
          onChange={(e) => setAssignedUserId(e.target.value)}
        />
        {errors.assignedUserId && (
          <p style={{ color: "red" }}>{errors.assignedUserId}</p>
        )}
      </div>
      <div>
        <label>Priority:</label>
        <select
          value={priorityId}
          onChange={(e) => setPriorityId(e.target.value)}
        >
          //<option value="1">Low</option>
          <option value="2">Medium</option>
          <option value="3">High</option>
          <option value="4">Urgent</option>
        </select>
        {errors.priorityId && <p style={{ color: "red" }}>{errors.priorityId}</p>}
      </div>
      <div>
        <label>Status:</label>
        <select
          value={statusId}
          onChange={(e) => setStatusId(e.target.value)}
        >
          <option value="1">Draft</option>
          <option value="2">In Progress</option>
          <option value="3">On Hold</option>
          <option value="4">Completed</option>
        </select>
        {errors.statusId && <p style={{ color: "red" }}>{errors.statusId}</p>}
      </div>
      <div className="button-container">
        <button type="submit" className="save">Save</button>
        </div>
    </form>
  );
};

export default TaskForm;
