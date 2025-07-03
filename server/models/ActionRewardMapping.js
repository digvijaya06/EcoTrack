const mongoose = require('mongoose');

const actionRewardMappingSchema = new mongoose.Schema({
  action: { type: mongoose.Schema.Types.ObjectId, ref: 'Action', required: true },
  reward: { type: mongoose.Schema.Types.ObjectId, ref: 'Reward', required: true },
  points: { type: Number, required: true }, // Points earned for this action
  description: { type: String }, // Optional description of the reward for this action
}, { timestamps: true });

const ActionRewardMapping = mongoose.model('ActionRewardMapping', actionRewardMappingSchema);

module.exports = ActionRewardMapping;
