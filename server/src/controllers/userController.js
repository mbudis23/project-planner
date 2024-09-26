const User = require("../models/userModel");
const asyncHandler = require("express-async-handler");
const jwt = require("jsonwebtoken");

// @desc    Register new user
// @route   POST /api/users/register
// @access  Public
exports.registerUser = asyncHandler(async (req, res) => {
  const { username, email, password } = req.body;

  // Check if user already exists
  const userExists = await User.findOne({ email });
  if (userExists) {
    res.status(400);
    throw new Error("User already exists");
  }

  // Create a new user
  const user = await User.create({
    username,
    email,
    password,
  });

  // Send response with token
  if (user) {
    res.status(201).json({
      _id: user._id,
      username: user.username,
      email: user.email,
      message: "Register Success",
    });
  } else {
    res.status(400);
    throw new Error("Invalid user data");
  }
});

// @desc    Login user
// @route   POST /api/users/login
// @access  Public
exports.loginUser = asyncHandler(async (req, res) => {
  const { email, password } = req.body;

  // Check if user exists
  const user = await User.findOne({ email });
  if (user && (await user.matchPassword(password))) {
    const token = jwt.sign({ id: user._id }, process.env.JWT_SECRET, {
      expiresIn: "1h",
    });
    res.cookie("token", token, {
      httpOnly: false,
      secure: process.env.NODE_ENV === "production", // Ensure secure cookies in production
      sameSite: "Strict", // Helps against CSRF attacks
      maxAge: 60 * 60 * 1000, // 1 hour in milliseconds
    });
    res.status(200).json({
      // _id: user._id,
      // username: user.username,
      // email: user.email,
      // token: user.getSignedJwtToken(),
      message: "Log in successful",
    });
  } else {
    res.status(401);
    throw new Error("Invalid credentials");
  }
});

// @desc    Get current user
// @route   GET /api/users/me
// @access  Private
exports.getUser = asyncHandler(async (req, res) => {
  const user = await User.findById(req.user._id);

  if (user) {
    res.json({
      _id: user._id,
      username: user.username,
      email: user.email,
    });
  } else {
    res.status(404);
    throw new Error("User not found");
  }
});

// @desc    Update user details
// @route   PUT /api/users/update
// @access  Private
exports.updateUser = asyncHandler(async (req, res) => {
  const { username, email, password } = req.body;
  const user = await User.findById(req.user._id);

  if (user) {
    user.username = username || user.username;
    user.email = email || user.email;

    if (password) {
      user.password = password;
    }

    const updatedUser = await user.save();

    res.json({
      _id: updatedUser._id,
      username: updatedUser.username,
      email: updatedUser.email,
      token: updatedUser.getSignedJwtToken(),
    });
  } else {
    res.status(404);
    throw new Error("User not found");
  }
});

// Forgot password
exports.forgotPassword = asyncHandler(async (req, res) => {
  // Logic for forgot password
  res.send("Forgot password logic goes here");
});

// Reset password
exports.resetPassword = asyncHandler(async (req, res) => {
  const { token } = req.params;
  // Logic for reset password with the token
  res.send("Reset password logic with token goes here");
});

// @desc    Verify user token
// @route   POST /api/users/verify-token
// @access  Private
exports.verifyToken = asyncHandler(async (req, res) => {
  // Get the token from the authorization header
  const token = req.headers.authorization?.split(" ")[1];

  if (!token) {
    res.status(401);
    throw new Error("No token provided, authorization denied");
  }

  try {
    // Verify the token
    const decoded = jwt.verify(token, process.env.JWT_SECRET);

    // Find user by ID from the decoded token
    const user = await User.findById(decoded.id).select("-password"); // Exclude password from the response

    if (!user) {
      res.status(404);
      throw new Error("User not found");
    }

    // Respond with user information
    res.status(200).json({
      _id: user._id,
      username: user.username,
      email: user.email,
    });
  } catch (error) {
    res.status(401);
    throw new Error("Token is not valid");
  }
});
