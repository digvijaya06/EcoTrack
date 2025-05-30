const mongoose = require('mongoose');

const rewardSchema = new mongoose.Schema({
  title: {
    type: String,
    required: true,
  },
  description: {
    type: String,
  },
  pointsRequired: {
    type: Number,
    required: true,
  },
  imageUrl: {
    type: String,
  },
  description:String,
  createdAt: {
    type: Date,
    default: Date.now,
  },
});

const Reward = mongoose.model('Reward', rewardSchema);

module.exports = Reward;
