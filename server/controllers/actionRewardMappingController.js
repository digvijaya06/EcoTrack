const ActionRewardMapping = require('../models/ActionRewardMapping');

// Get all action-reward mappings (public)
exports.getAllMappings = async (req, res) => {
  try {
    const mappings = await ActionRewardMapping.find()
      .populate('action', 'title description')
      .populate('reward', 'title description cost');
    res.json(mappings);
  } catch (error) {
    console.error('Get Action-Reward Mappings Error:', error);
    res.status(500).json({ message: 'Server error' });
  }
};
