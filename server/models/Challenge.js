const mongoose = require('mongoose');

const challengeSchema = new mongoose.Schema({
  title: {
    type: String,
    required: true,
  },
  description: {
    type: String,
  },
  category: {
    type: String,
    required: true,
  },
  targetPoints: {
    type: Number,
    required: true,
  },
  deadline: {
    type: Date,
  },
  createdAt: {
    type: Date,
    default: Date.now,
  },
});

const Challenge = mongoose.model('Challenge', challengeSchema);

module.exports = Challenge;
