const express = require('express');
const { createTask, fetchAllTasks, updateTaskById, deleteTaskById } = require('../Controllers/TaskController');

const router = express.Router();

// Fetch all tasks
router.get('/', fetchAllTasks); // Changed from '/tasks' to '/' since this router is mounted at '/tasks'

// Create a new task
router.post('/', createTask); // Changed from '/tasks' to '/' since this router is mounted at '/tasks'

// Update an existing task by ID
router.put('/:id', updateTaskById); // Changed from '/tasks/:id' to '/:id'

// Delete a task by ID
router.delete('/:id', deleteTaskById);

module.exports = router;