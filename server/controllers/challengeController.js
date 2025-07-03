const Reward = require('../models/Reward');

// Get all challenges (fetched from rewards)
exports.getAllChallenges = async (req, res) => {
  try {
    const challenges = await Reward.find();
    res.json(challenges);
  } catch (error) {
    console.error('Get Challenges Error:', error);
    res.status(500).json({ message: 'Server error' });
  }
};

// Get challenge by ID
exports.getChallengeById = async (req, res) => {
  try {
    const challenge = await Challenge.findById(req.params.id);
    if (!challenge) return res.status(404).json({ message: 'Challenge not found' });
    res.json(challenge);
  } catch (error) {
    console.error('Get Challenge Error:', error);
    res.status(500).json({ message: 'Server error' });
  }
};

// Create new challenge (admin only)
exports.createChallenge = async (req, res) => {
  try {
    const challenge = new Challenge(req.body);
    await challenge.save();
    res.status(201).json(challenge);
  } catch (error) {
    console.error('Create Challenge Error:', error);
    res.status(500).json({ message: 'Server error' });
  }
};

// Update challenge (admin only)
exports.updateChallenge = async (req, res) => {
  try {
    const challenge = await Challenge.findByIdAndUpdate(req.params.id, req.body, { new: true });
    if (!challenge) return res.status(404).json({ message: 'Challenge not found' });
    res.json(challenge);
  } catch (error) {
    console.error('Update Challenge Error:', error);
    res.status(500).json({ message: 'Server error' });
  }
};

// Delete challenge (admin only)
exports.deleteChallenge = async (req, res) => {
  try {
    const challenge = await Challenge.findByIdAndDelete(req.params.id);
    if (!challenge) return res.status(404).json({ message: 'Challenge not found' });
    res.json({ message: 'Challenge deleted' });
  } catch (error) {
    console.error('Delete Challenge Error:', error);
    res.status(500).json({ message: 'Server error' });
  }
};
