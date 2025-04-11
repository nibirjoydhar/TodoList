const mongoose = require('mongoose');

// Define the schema for a todo task
const todoSchema = new mongoose.Schema({
  task: String,
  done: {
    type: Boolean,
    default: false, // Default value for done is false
  }
});

// Create the model based on the schema
const todoModel = mongoose.model('todos', todoSchema);

// Export the model
module.exports = todoModel;
