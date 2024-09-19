const express = require('express');
const {
  createProject,
  getProjects,
  getProjectById,
  updateProject,
  deleteProject,
} = require('../controllers/projectController');
const { protect } = require('../middlewares/authMiddleware');

const router = express.Router();

// Protected routes (all project routes are protected)
router.post('/', protect, createProject);           // Create a project
router.get('/', protect, getProjects);              // Get all projects for logged-in user
router.get('/:id', protect, getProjectById);        // Get a specific project by ID
router.put('/:id', protect, updateProject);         // Update a project by ID
router.delete('/:id', protect, deleteProject);      // Delete a project by ID

module.exports = router;
