const express = require("express");
const router = express.Router();
const Task = require("../models/Task");

// GET all tasks
router.get("/", async (req, res) => {
  try {
    const tasks = await Task.find();
    res.status(200).json(tasks);
  } catch (error) {
    console.error("Error fetching tasks:", error);
    res.status(500).json({ error: "Error fetching tasks" });
  }
});

// GET a task by ID
router.get("/:id", async (req, res) => {
  console.log('Trying to fetch task...')
  try {
    const task = await Task.findById(req.params.id);
    if (!task) return res.status(404).json({ error: "Task not found" });
    res.status(200).json(task);
  } catch (error) {
    console.error("Error fetching task:", error);
    res.status(500).json({ error: "Error fetching task" });
  }
});

// POST a new task
router.post("/addTask", async (req, res) => {
  try {
    console.log('Trying to add task!'+req.body)
    const { task_id,
       title,
        description,
        due_date,
        assigned_user_id,
        priority_id,
        status_id } = req.body; 
    // Validate request body
    if (!task_id)
      return res.status(400).json( { error: "Missing task id"});
    if (!title)
      return res.status(400).json( { error: "Missing title id"});
    if (!description)
      return res.status(400).json( { error: "Missing description id"});
    if (!assigned_user_id)
      return res.status(400).json( { error: "Missing assigned user id"});
    if (!priority_id)
      return res.status(400).json( { error: "Missing priority id"});
    if (!status_id) {
      return res.status(400).json({ error: "Missing status field"});
    }
    console.log(req.body); 
    const newTask = new Task({
      task_id,
      title,
      description,
      due_date,
      assigned_user_id,
      priority_id,
      status_id,
      create_date: new Date(),
      update_date: new Date(),
    } );
    const savedTask = await newTask.save();
    res.status(201).json(savedTask);
  } catch (error) {
    console.error("Error creating task:", error);
    res.status(500).json({ error: "Error creating task" });
  }
});

// PUT (update) a task by ID
router.put("/updateTask/:id", async (req, res) => {
  try {
    const { task_id,
       title,
        description,
        due_date,
        assigned_user_id,
         priority_id,
          status_id } = req.body;

    // Validate required fields
    if (!title || !description) {
      return res.status(400).json({ error: "Missing title or description fields" });
    }

    // Find and update the task
    const updatedTask = await Task.findByIdAndUpdate(
      req.params.id, 
      {
        task_id,
        title,
        description,
        due_date,
        assigned_user_id,
        priority_id,
        status_id,
        update_date: new Date(), 
      },
      { new: true, runValidators: true } 
    );

    // Check if task exists
    if (!updatedTask) {
      return res.status(404).json({ error: "Task not found" });
    }

    // Respond with the updated task
    res.status(200).json(updatedTask);
  } catch (error) {
    console.error("Error updating task:", error);
    res.status(500).json({ error: "Error updating task" });
  }
});


// DELETE a task by ID
router.delete("/deleteTask/:id", async (req, res) => {
  try {
    const deletedTask = await Task.findByIdAndDelete(req.params.id);

    if (!deletedTask) {
      return res.status(404).json({ error: "Task not found" });
    }

    res.status(200).json({ message: "Task deleted successfully" });
  } catch (error) {
    console.error("Error deleting task:", error);
    res.status(500).json({ error: "Error deleting task" });
  }
});

module.exports = router;