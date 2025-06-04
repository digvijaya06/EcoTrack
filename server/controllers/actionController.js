const Action = require('../models/Action');
const User = require('../models/User');

// Get all actions (user accessible)
exports.getActions = async (req, res) => {
  try {
    const actions = await Action.find({ user: req.user._id });
    res.json(actions);
  } catch (error) {
    console.error('Get Actions Error:', error);
    res.status(500).json({ message: 'Server error' });
  }
};

// Get action by ID (user accessible)
exports.getActionById = async (req, res) => {
  try {
    const action = await Action.findOne({ _id: req.params.id, user: req.user._id });
    if (!action) return res.status(404).json({ message: 'Action not found' });
    res.json(action);
  } catch (error) {
    console.error('Get Action Error:', error);
    res.status(500).json({ message: 'Server error' });
  }
};

// Create new action (user accessible)
exports.createAction = async (req, res) => {
  try {
    console.log('Create Action Request Body:', req.body);
    const { title, category, type, points, notes } = req.body;
    const userId = req.user.id;

    if (!title || !category || !points) {
      return res.status(400).json({ message: 'Missing required fields' });
    }

    const newAction = new Action({
      user: userId,
      title,
      category,
      type,
      points,
      notes,
    });

    await newAction.save();

    // Update user points
    const user = await User.findById(userId);
    if (user) {
      user.points += points;
      await user.save();
    }

    res.status(201).json(newAction);
  } catch (error) {
    console.error('Create Action Error:', error);
    res.status(500).json({ message: 'Server error while creating action' });
  }
};

// Update action (user accessible)
exports.updateAction = async (req, res) => {
  try {
    const action = await Action.findOneAndUpdate(
      { _id: req.params.id, user: req.user._id },
      req.body,
      { new: true }
    );
    if (!action) return res.status(404).json({ message: 'Action not found' });
    res.json(action);
  } catch (error) {
    console.error('Update Action Error:', error);
    res.status(500).json({ message: 'Server error' });
  }
};

// Delete action (user accessible)
exports.deleteAction = async (req, res) => {
  try {
    const action = await Action.findOneAndDelete({ _id: req.params.id, user: req.user._id });
    if (!action) return res.status(404).json({ message: 'Action not found' });
    res.json({ message: 'Action deleted' });
  } catch (error) {
    console.error('Delete Action Error:', error);
    res.status(500).json({ message: 'Server error' });
  }
};
// Get available types and categories for dropdowns
exports.getActionMeta = async (req, res) => {
  try {
    const types = [
      'Tree Plantation',
      'Bicycle Commute',
      'Carpool',
      'Energy Saving',
      'Water Conservation',
      'Recycling'
    ];

    const categories = [
      'plantation',
      'transport',
      'energy',
      'water',
      'waste',
      'food'
    ];

    res.json({ types, categories });
  } catch (error) {
    console.error('Get Meta Error:', error);
    res.status(500).json({ message: 'Failed to fetch action metadata' });
  }
};
