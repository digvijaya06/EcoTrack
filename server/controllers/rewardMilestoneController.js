const express = require('express');
const router = express.Router();

// Import controller functions
const {
  createRewardMilestone,
  getAllRewardMilestones,
  getUserRewards
} = require('../controllers/rewardMilestoneController');

// Import auth middleware
const { protect, admin } = require('../middleware/authMiddleware');

// Admin routes for managing reward milestones
router.post('/', protect, admin, createRewardMilestone);
router.get('/', protect, admin, getAllRewardMilestones);
router.get('/user-rewards', protect, admin, getUserRewards);

module.exports = router;
