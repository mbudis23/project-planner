const Task = require('../models/taskModel');
const Project = require('../models/projectModel');
const asyncHandler = require('express-async-handler');

// @desc    Create new task
// @route   POST /api/tasks
// @access  Private
exports.createTask = asyncHandler(async (req, res) => {
  const { title, description, projectId } = req.body;

  // Validate if project exists
  const project = await Project.findById(projectId);
  if (!project || !project.user.equals(req.user._id)) {
    res.status(404);
    throw new Error('Project not found or not authorized');
  }

  const task = await Task.create({
    title,
    description,
    project: projectId,
  });

  // Add task to the project
  project.tasks.push(task._id);
  await project.save();

  res.status(201).json(task);
});

// @desc    Get all tasks for a project
// @route   GET /api/tasks
// @access  Private
exports.getTasks = asyncHandler(async (req, res) => {
  const tasks = await Task.find({ project: req.query.projectId });

  res.json(tasks);
});

// @desc    Get a single task by ID
// @route   GET /api/tasks/:id
// @access  Private
exports.getTaskById = asyncHandler(async (req, res) => {
  const task = await Task.findById(req.params.id);

  if (task) {
    res.json(task);
  } else {
    res.status(404);
    throw new Error('Task not found');
  }
});

// @desc    Update task by ID
// @route   PUT /api/tasks/:id
// @access  Private
exports.updateTask = asyncHandler(async (req, res) => {
  const { title, description, status } = req.body;
  const task = await Task.findById(req.params.id);

  if (task) {
    task.title = title || task.title;
    task.description = description || task.description;
    task.status = status || task.status;

    const updatedTask = await task.save();
    res.json(updatedTask);
  } else {
    res.status(404);
    throw new Error('Task not found');
  }
});

// @desc    Delete task by ID
// @route   DELETE /api/tasks/:id
// @access  Private
exports.deleteTask = asyncHandler(async (req, res) => {
  const task = await Task.findById(req.params.id);

  if (task) {
    await task.remove();

    // Remove task from the project
    const project = await Project.findById(task.project);
    project.tasks.pull(task._id);
    await project.save();

    res.json({ message: 'Task removed' });
  } else {
    res.status(404);
    throw new Error('Task not found');
  }
});
