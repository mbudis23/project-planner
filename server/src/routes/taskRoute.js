const express = require('express');
const {
  createTask,
  getTasks,
  getTaskById,
  updateTask,
  deleteTask,
} = require('../controllers/taskController');
const { protect } = require('../middlewares/authMiddleware');

const router = express.Router();

// Protected routes (all task routes are protected)
router.post('/', protect, createTask);              // Create a task
router.get('/', protect, getTasks);                 // Get all tasks for a project
router.get('/:id', protect, getTaskById);           // Get a specific task by ID
router.put('/:id', protect, updateTask);            // Update a task by ID
router.delete('/:id', protect, deleteTask);         // Delete a task by ID

module.exports = router;
