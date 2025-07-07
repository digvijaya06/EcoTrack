const mongoose = require('mongoose');

const userRewardSchema = new mongoose.Schema({
  userId: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true },
  rewardMilestoneId: { type: mongoose.Schema.Types.ObjectId, ref: 'RewardMilestone', required: true },
  earnedAt: { type: Date, default: Date.now }
});

module.exports = mongoose.model('UserReward', userRewardSchema);
