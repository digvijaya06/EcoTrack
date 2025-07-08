const asyncHandler = require('express-async-handler');
const RewardMilestone = require('../models/RewardMilestone');

// @desc    Create a new reward milestone
// @route   POST /api/rewardMilestone
// @access  Private/Admin
const createRewardMilestone = asyncHandler(async (req, res) => {
  const { title, description, pointsRequired } = req.body;

  if (!title || !description || !pointsRequired) {
    res.status(400);
    throw new Error('Please provide all required fields');
  }

  const rewardMilestone = new RewardMilestone({
    title,
    description,
    pointsRequired,
  });

  const createdMilestone = await rewardMilestone.save();
  res.status(201).json(createdMilestone);
});

// @desc    Get all reward milestones
// @route   GET /api/rewardMilestone
// @access  Private/Admin
const getAllRewardMilestones = asyncHandler(async (req, res) => {
  const milestones = await RewardMilestone.find({});
  res.json(milestones);
});

// @desc    Get user rewards
// @route   GET /api/rewardMilestone/user-rewards
// @access  Private/Admin
const UserReward = require('../models/UserReward');

const getUserRewards = asyncHandler(async (req, res) => {
  const userRewards = await UserReward.find({})
    .populate('userId', 'name')
    .populate('rewardMilestoneId', 'title category target')
    .exec();
  res.json(userRewards);
});

module.exports = {
  createRewardMilestone,
  getAllRewardMilestones,
  getUserRewards,
};
