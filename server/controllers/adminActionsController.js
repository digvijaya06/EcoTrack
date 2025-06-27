const Action = require('../models/Action');

// GET all actions
exports.getAllActions = async (req, res) => {
  try {
    console.log('Fetching all user actions for admin...');
    let actions = await Action.find().populate('user', 'name email');
    console.log(`Fetched ${actions.length} actions`);
    actions.forEach(action => {
      if (!action.user) {
        console.warn('Action with null user reference:', action._id);
      } else {
        console.log('Action:', action._id, 'User:', action.user);
      }
    });
    // Filter out actions with null user (in case of invalid references)
    const filteredActions = actions.filter(action => action.user !== null);
    console.log(`Filtered actions count (non-null users): ${filteredActions.length}`);

    // Map to add description field from notes
    const mappedActions = filteredActions.map(action => ({
      ...action.toObject(),
      description: action.notes || '',
    }));

    res.json(mappedActions);
  } catch (err) {
    console.error('Error in getAllActions:', err);
    res.status(500).json({ message: 'Error fetching actions' });
  }
};

const User = require('../models/User');

// APPROVE
exports.approveAction = async (req, res) => {
  try {
    const action = await Action.findById(req.params.id);
    if (!action) {
      return res.status(404).json({ message: 'Action not found' });
    }
    if (action.status === 'Approved') {
      return res.status(400).json({ message: 'Action already approved' });
    }
    action.status = 'Approved';
    await action.save();

    // Update user points
    const user = await User.findById(action.user);
    if (user) {
      user.points += action.points;
      await user.save();
    }

    res.json(action);
  } catch (err) {
    console.error('Error approving action:', err);
    res.status(500).json({ message: 'Failed to approve action' });
  }
};

// REJECT
exports.rejectAction = async (req, res) => {
  try {
    const action = await Action.findById(req.params.id);
    if (!action) {
      return res.status(404).json({ message: 'Action not found' });
    }
    if (action.status === 'Rejected') {
      return res.status(400).json({ message: 'Action already rejected' });
    }
    action.status = 'Rejected';
    await action.save();

    res.json(action);
  } catch (err) {
    console.error('Error rejecting action:', err);
    res.status(500).json({ message: 'Failed to reject action' });
  }
};
