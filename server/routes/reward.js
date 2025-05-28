const express = require('express');
const router = express.Router();
const rewardController = require('../controllers/rewardController');
const protect = require('../middleware/authMiddleware');
 
// Get all rewards (admin only)
router.get('/', protect, rewardController.getRewards);

// Get reward by ID (admin only)
router.get('/:id', protect, rewardController.getRewardById);

// Create new reward (admin only)
router.post('/', protect, rewardController.createReward);

// Update reward (admin only)
router.put('/:id', protect, rewardController.updateReward);

// Delete reward (admin only)
router.delete('/:id', protect, rewardController.deleteReward);

module.exports = router;
