const Project = require('../models/projectModel');
const asyncHandler = require('express-async-handler');

// @desc    Create new project
// @route   POST /api/projects
// @access  Private
exports.createProject = asyncHandler(async (req, res) => {
  const { title, description } = req.body;

  const project = await Project.create({
    title,
    description,
    user: req.user._id,
  });

  res.status(201).json(project);
});

// @desc    Get all projects for a user
// @route   GET /api/projects
// @access  Private
exports.getProjects = asyncHandler(async (req, res) => {
  const projects = await Project.find({ user: req.user._id }).populate('tasks');

  res.json(projects);
});

// @desc    Get a single project by ID
// @route   GET /api/projects/:id
// @access  Private
exports.getProjectById = asyncHandler(async (req, res) => {
  const project = await Project.findById(req.params.id).populate('tasks');

  if (project && project.user.equals(req.user._id)) {
    res.json(project);
  } else {
    res.status(404);
    throw new Error('Project not found');
  }
});

// @desc    Update project by ID
// @route   PUT /api/projects/:id
// @access  Private
exports.updateProject = asyncHandler(async (req, res) => {
  const { title, description } = req.body;
  const project = await Project.findById(req.params.id);

  if (project && project.user.equals(req.user._id)) {
    project.title = title || project.title;
    project.description = description || project.description;

    const updatedProject = await project.save();
    res.json(updatedProject);
  } else {
    res.status(404);
    throw new Error('Project not found or not authorized');
  }
});

// @desc    Delete project by ID
// @route   DELETE /api/projects/:id
// @access  Private
exports.deleteProject = asyncHandler(async (req, res) => {
  const project = await Project.findById(req.params.id);

  if (project && project.user.equals(req.user._id)) {
    await project.remove();
    res.json({ message: 'Project removed' });
  } else {
    res.status(404);
    throw new Error('Project not found or not authorized');
  }
});
