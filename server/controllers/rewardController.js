
const Reward = require('../models/Reward');
const RewardClaim = require('../models/RewardClaim');

// Get all rewards (admin only)
exports.getRewards = async (req, res) => {
  try {
    const rewards = await Reward.find();
    res.json(rewards);
  } catch (error) {
    console.error('Get Rewards Error:', error);
    res.status(500).json({ message: 'Server error' });
  }
};

// Get reward by ID (admin only)
exports.getRewardById = async (req, res) => {
  try {
    const reward = await Reward.findById(req.params.id);
    if (!reward) return res.status(404).json({ message: 'Reward not found' });
    res.json(reward);
  } catch (error) {
    console.error('Get Reward Error:', error);
    res.status(500).json({ message: 'Server error' });
  }
};

// Create new reward (admin only)
exports.createReward = async (req, res) => {
  try {
    const reward = new Reward(req.body);
    await reward.save();
    res.status(201).json(reward);
  } catch (error) {
    console.error('Create Reward Error:', error);
    res.status(500).json({ message: 'Server error' });
  }
};

// Update reward (admin only)
exports.updateReward = async (req, res) => {
  try {
    const reward = await Reward.findByIdAndUpdate(req.params.id, req.body, { new: true });
    if (!reward) return res.status(404).json({ message: 'Reward not found' });
    res.json(reward);
  } catch (error) {
    console.error('Update Reward Error:', error);
    res.status(500).json({ message: 'Server error' });
  }
};

// Delete reward (admin only)
exports.deleteReward = async (req, res) => {
  try {
    const reward = await Reward.findByIdAndDelete(req.params.id);
    if (!reward) return res.status(404).json({ message: 'Reward not found' });
    res.json({ message: 'Reward deleted' });
  } catch (error) {
    console.error('Delete Reward Error:', error);
    res.status(500).json({ message: 'Server error' });
  }
};

// Create a reward claim (user)
exports.createRewardClaim = async (req, res) => {
  try {
    const rewardClaim = new RewardClaim(req.body);
    await rewardClaim.save();
    res.status(201).json(rewardClaim);
  } catch (error) {
    console.error('Create Reward Claim Error:', error);
    res.status(500).json({ message: 'Server error' });
  }
};
