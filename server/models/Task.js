const mongoose = require("mongoose");

const taskSchema = new mongoose.Schema({
  task_id: { type: Number, required: true, unique: true },
  title: { type: String, required: true },
  description: { type: String, required: true },
  due_date: { type: Date, required: true },
  assigned_user_id: { type: Number, required: true }, 
  priority_id: { type: Number, required: true }, 
  status_id: { type: Number, required: true }, 
  create_date: { type: Date, default: Date.now },
  update_date: { type: Date, default: Date.now },
  
});

module.exports = mongoose.model("Task", taskSchema);
