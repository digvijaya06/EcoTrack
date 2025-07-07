const express = require('express');
const router = express.Router();
const { protect } = require('../middleware/authMiddleware');
const User = require('../models/User');
const { getBadges, getAchievements } = require('../controllers/userController');

// @route   GET /api/users/me
// @desc    Get current user profile
// @access  Private
const Action = require('../models/Action');
const { calculatePoints } = require('../utils/pointsCalculator');

router.get('/me', protect, async (req, res) => {
  try {
    // Fetch user actions
    const actions = await Action.find({ user: req.user._id });
    // Calculate total points
    const totalPoints = calculatePoints(actions);
    // Add totalPoints to user object
    const userWithPoints = req.user.toObject();
    userWithPoints.totalPoints = totalPoints;
    res.json(userWithPoints);
  } catch (error) {
    console.error('Get profile error:', error);
    res.status(500).json({ message: 'Server error' });
  }
});

// @route   PUT /api/users/me
// @desc    Update user profile
// @access  Private
router.put('/me', protect, async (req, res) => {
  try {
    const { name, location, bio, website, avatar } = req.body;

    const user = await User.findById(req.user._id);
    if (!user) {
      return res.status(404).json({ message: 'User not found' });
    }

    user.name = name || user.name;
    user.location = location || user.location;
    user.bio = bio || user.bio;
    user.website = website || user.website;
    user.avatar = avatar || user.avatar;

    await user.save();

    res.json(user);
  } catch (error) {
    console.error('Update profile error:', error);
    res.status(500).json({ message: 'Server error' });
  }
});

// @route   GET /api/users/me/badges
// @desc    Get current user badges
// @access  Private
router.get('/me/badges', protect, getBadges);

// @route   GET /api/users/me/achievements
// @desc    Get current user achievements
// @access  Private
router.get('/me/achievements', protect, getAchievements);

module.exports = router;
