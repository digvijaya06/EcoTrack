const mongoose = require('mongoose');

const challengeParticipationSchema = new mongoose.Schema({
  user: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User',
    required: true,
  },
  challenge: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Challenge',
    required: true,
  },
  joinedAt: {
    type: Date,
    default: Date.now,
  },
  status: {
    type: String,
    enum: ['joined', 'approved', 'rejected', 'completed'],
    default: 'joined',
  }
});

const ChallengeParticipation = mongoose.model('ChallengeParticipation', challengeParticipationSchema);

module.exports = ChallengeParticipation;
