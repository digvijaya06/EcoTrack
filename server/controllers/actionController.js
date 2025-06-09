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
    const { title, category, type, notes } = req.body;
    const userId = req.user.id;

    if (!title || !category || !type) {
      return res.status(400).json({ message: 'Missing required fields' });
    }

    // Points mapping based on action type
    const pointsMapping = {
      'Tree Plantation': 20,
      'Bicycle Commute': 10,
      'Carpool': 15,
      'Energy Saving': 5,
      'Water Conservation': 5,
      'Recycling': 10
    };

    const points = pointsMapping[type] || 0;

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

// GET /api/actions/stats/categories
// Returns count of actions grouped by category for pie chart
exports.getStatsByCategory = async (req, res) => {
  try {
    const stats = await Action.aggregate([
      { $match: { user: req.user._id } },
      { $group: { _id: '$category', count: { $sum: 1 } } }
    ]);
    res.json(stats);
  } catch (error) {
    console.error('Get Stats By Category Error:', error);
    res.status(500).json({ message: 'Server error' });
  }
};

// GET /api/actions/stats/weekly
// Returns count of actions grouped by week for bar chart
exports.getStatsWeekly = async (req, res) => {
  try {
    const stats = await Action.aggregate([
      { $match: { user: req.user._id } },
      {
        $group: {
          _id: {
            year: { $year: '$createdAt' },
            week: { $isoWeek: '$createdAt' }
          },
          count: { $sum: 1 }
        }
      },
      { $sort: { '_id.year': 1, '_id.week': 1 } }
    ]);
    res.json(stats);
  } catch (error) {
    console.error('Get Stats Weekly Error:', error);
    res.status(500).json({ message: 'Server error' });
  }
};
