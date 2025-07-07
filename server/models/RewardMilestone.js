const mongoose = require('mongoose');

const rewardMilestoneSchema = new mongoose.Schema({
  title: { type: String, required: true },
  category: { type: String, required: true },
  target: { type: Number, required: true },
  description: { type: String, default: '' },
  imageUrl: { type: String, default: '' },
  createdAt: { type: Date, default: Date.now }
});

module.exports = mongoose.model('RewardMilestone', rewardMilestoneSchema);
