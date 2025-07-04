
const mongoose = require('mongoose');
const ChallengeParticipation = require('../models/ChallengeParticipation');

// User joins a challenge
exports.joinChallenge = async (req, res) => {
  try {
    const { userId, challengeId } = req.body;

    console.log('joinChallenge received userId:', userId, 'challengeId:', challengeId);

    if (!userId || !challengeId) {
      return res.status(400).json({ message: 'User ID and Challenge ID are required' });
    }

    // Check if already joined
    const existing = await ChallengeParticipation.findOne({ user: userId, challenge: challengeId });
    if (existing) {
      return res.status(400).json({ message: 'User already joined this challenge' });
    }

    const ObjectId = mongoose.Types.ObjectId;

    const participation = new ChallengeParticipation({
      user: new ObjectId(userId),
      challenge: new ObjectId(challengeId),
    });

    const savedParticipation = await participation.save();

    console.log('Saved participation:', savedParticipation);

    res.status(201).json(savedParticipation);
  } catch (error) {
    console.error('Join Challenge Error:', error);
    res.status(500).json({ message: 'Server error' });
  }
};

// Get approved participations for logged-in user
exports.getApprovedParticipationsForUser = async (req, res) => {
  try {
    const userId = req.user._id; // Assuming auth middleware sets req.user
    const participations = await ChallengeParticipation.find({ user: userId, status: 'approved' })
      .populate('challenge', 'title description cost')
      .exec();
    res.json(participations);
  } catch (error) {
    console.error('Error fetching approved participations:', error);
    res.status(500).json({ message: 'Server error' });
  }
};

// Get joined or approved participations for logged-in user
exports.getJoinedOrApprovedParticipationsForUser = async (req, res) => {
  try {
    const userId = req.user._id;
    const participations = await ChallengeParticipation.find({ 
      user: userId, 
      status: { $in: ['joined', 'approved'] } 
    })
    .populate('challenge', 'title description cost')
    .exec();
    res.json(participations);
  } catch (error) {
    console.error('Error fetching joined or approved participations:', error);
    res.status(500).json({ message: 'Server error' });
  }
};
