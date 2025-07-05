
const express = require('express');
const router = express.Router();
const rewardController = require('../controllers/rewardController');
const protect = require('../middleware/authMiddleware');

// Get all rewards (admin only)
router.get('/', protect, rewardController.fetchRewards);

// Create new reward (admin only) - Added missing route
router.post('/', protect, rewardController.createReward);

// Get reward by ID (admin only)
router.get('/:id', protect, rewardController.fetchRewardById);

// Update reward by ID (admin only)
router.put('/:id', protect, rewardController.updateReward);

// Get all users with impact progress and badge eligibility (admin only)
router.get('/eligibility/users', protect, rewardController.getUsersWithEligibility);

// Approve badge for a user (admin only)
router.post('/approve', protect, rewardController.approveBadge);

// Send email with badge image (admin only)
router.post('/send-email', protect, rewardController.sendBadgeEmail);

// Create a reward claim (user)
router.post('/claim', protect, rewardController.createRewardClaim);

// Get all category targets (admin only)
router.get('/category-targets', protect, rewardController.getCategoryTargets);

// Set or update category target points (admin only)
router.post('/category-targets', protect, rewardController.setCategoryTarget);

// Upload reward image (admin only)
router.post('/upload-image', protect, rewardController.uploadRewardImage);

// Delete reward by ID (admin only) - Added missing route
router.delete('/:id', protect, rewardController.deleteReward);

// Update threshold met status for a user (admin only)
router.put('/eligibility/threshold/:userId', protect, rewardController.updateThresholdMet);

module.exports = router;
