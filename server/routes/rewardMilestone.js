const express = require('express');
const router = express.Router();
const {
  createRewardMilestone,
  getAllRewardMilestones,
  getUserRewards
} = require('../controllers/rewardMilestoneController');
const { protect, admin } = require('../middleware/authMiddleware');

// Admin routes for reward milestones
router.post('/', protect, admin, createRewardMilestone);
router.get('/', protect, admin, getAllRewardMilestones);
router.get('/user-rewards', protect, admin, getUserRewards);

module.exports = router;
