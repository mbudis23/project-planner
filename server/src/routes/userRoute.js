const express = require('express');
const {
  registerUser,
  loginUser,
  updateUser,
  forgotPassword,
  resetPassword,
  getUser,
} = require('../controllers/userController');
const { protect } = require('../middlewares/authMiddleware');

const router = express.Router();

// Public routes
router.post('/register', registerUser);
router.post('/login', loginUser);
router.post('/forgot-password', forgotPassword);
router.post('/reset-password/:token', resetPassword);

// Protected routes (require authentication)
router.get('/user', protect, getUser);  // Fetch current user details
router.patch('/update', protect, updateUser);  // Update user details

module.exports = router;
