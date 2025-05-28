const Action = require('../models/Action');

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
    const action = new Action({
      ...req.body,
      user: req.user._id,
    });
    await action.save();
    res.status(201).json(action);
  } catch (error) {
    console.error('Create Action Error:', error);
    res.status(500).json({ message: 'Server error' });
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
