const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const User = require('../models/User');

const registerUser = async (req, res) => {
  try {
    const { name, username, email, password } = req.body;

    if (!name || !username || !email || !password) {
      return res.status(400).json({ message: 'All fields are required' });
    }

    const existingUser = await User.findOne({ $or: [{ email }, { username }] });
    if (existingUser) {
      return res.status(400).json({ message: 'Email or username already exists' });
    }

    // Remove manual hashing, rely on pre-save hook
    const user = new User({
      name,
      username,
      email,
      password,
      location: '',
      bio: '',
      website: '',
      avatar: '',
      role: 'registered'
    });

    await user.save();

    if (!process.env.JWT_SECRET) {
      console.warn('JWT_SECRET is not set. Using default secret.');
      process.env.JWT_SECRET = 'default_jwt_secret_key_change_me';
    }

    let token;
    try {
      token = jwt.sign({ id: user._id }, process.env.JWT_SECRET, { expiresIn: '7d' });
    } catch (jwtError) {
      console.error('JWT signing error during registration:', jwtError);
      return res.status(500).json({ message: 'Token generation failed during registration' });
    }

    res.status(201).json({
      token,
      user: {
        _id: user._id,
        name: user.name,
        username: user.username,
        email: user.email,
        isAdmin: user.isAdmin,
        role: user.isAdmin ? 'admin' : 'registered',
        createdAt: user.createdAt,
        location: user.location,
        bio: user.bio,
        website: user.website,
        avatar: user.avatar
      }
    });

  } catch (error) {
    console.error('Register Error:', error);
    // Return detailed error message if available
    if (error.name === 'ValidationError') {
      return res.status(400).json({ message: error.message });
    }
    if (error.code && error.code === 11000) {
      // Duplicate key error
      const field = Object.keys(error.keyValue)[0];
      return res.status(400).json({ message: `${field} already exists` });
    }
    res.status(500).json({ message: 'Server error: ' + error.message });
  }
};

const loginUser = async (req, res) => {
  try {
    const { email, password } = req.body;
    console.log('Login attempt:', email, password);

    if (!email || !password) {
      return res.status(400).json({ message: 'Email and password are required' });
    }

    const user = await User.findOne({ email });

    if (!user) {
      return res.status(400).json({ message: 'Invalid credentials' });
    }

    const isMatch = await user.comparePassword(password);
    if (!isMatch) {
      console.log('Password did not match for email:', email);
      return res.status(400).json({ message: 'Invalid credentials' });
    }

    if (!process.env.JWT_SECRET) {
      console.warn('JWT_SECRET is not set. Using default secret.');
      process.env.JWT_SECRET = 'default_jwt_secret_key_change_me';
    }

    let token;
    try {
      token = jwt.sign({ id: user._id }, process.env.JWT_SECRET, { expiresIn: '7d' });
    } catch (jwtError) {
      console.error('JWT signing error:', jwtError);
      return res.status(500).json({ message: 'Token generation failed' });
    }

    res.json({
      token,
      user: {
        _id: user._id,
        name: user.name || '',
        username: user.username || '',
        email: user.email || '',
        isAdmin: user.isAdmin || false,
        role: user.isAdmin ? 'admin' : 'registered',
        createdAt: user.createdAt || new Date()
      }
    });

  } catch (error) {
    console.error('Login Error:', error);
    console.error('Error stack:', error.stack);
    console.error('Error message:', error.message);
    res.status(500).json({ message: 'Server error', error: error.message });
  }
};

const getMe = async (req, res) => {
  try {
    res.json(req.user);
  } catch (error) {
    console.error('Get Me Error:', error);
    res.status(500).json({ message: 'Server error' });
  }
};

const forgotPassword = async (req, res) => {
  try {
    const { email } = req.body;
    if (!email) {
      return res.status(400).json({ message: 'Email is required' });
    }

    const user = await User.findOne({ email });
    if (!user) {
      return res.status(400).json({ message: 'No user found with that email' });
    }

    // Generate reset token (JWT) with 1 hour expiry
    const resetToken = jwt.sign({ id: user._id }, process.env.JWT_SECRET, { expiresIn: '1h' });

    // In real app, send email with resetToken link
    // Here, just return the token for testing
    res.json({ message: 'Password reset token generated', resetToken });

  } catch (error) {
    console.error('Forgot Password Error:', error);
    res.status(500).json({ message: 'Server error' });
  }
};

const resetPassword = async (req, res) => {
  try {
    const { token, newPassword } = req.body;
    if (!token || !newPassword) {
      return res.status(400).json({ message: 'Token and new password are required' });
    }

    // Verify token
    let decoded;
    try {
      decoded = jwt.verify(token, process.env.JWT_SECRET);
    } catch (err) {
      return res.status(400).json({ message: 'Invalid or expired token' });
    }

    const user = await User.findById(decoded.id);
    if (!user) {
      return res.status(400).json({ message: 'User not found' });
    }

    // Update password (pre-save hook will hash it)
    user.password = newPassword;
    await user.save();

    res.json({ message: 'Password has been reset successfully' });

  } catch (error) {
    console.error('Reset Password Error:', error);
    res.status(500).json({ message: 'Server error' });
  }
};

module.exports = {
  registerUser,
  loginUser,
  getMe,
  forgotPassword,
  resetPassword
};
