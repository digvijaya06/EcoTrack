const User = require('../models/User');
const Action = require('../models/Action');
const Goal = require('../models/Goal');

// Get all users
exports.getUsers = async (req, res) => {
  try {
    const users = await User.find().select('-password'); // exclude password
    res.json(users);
  } catch (error) {
    console.error('Error fetching users:', error);
    res.status(500).json({ message: 'Server error fetching users' });
  }
};

// Update user by ID
exports.updateUser = async (req, res) => {
  try {
    const userId = req.params.id;
    const updates = req.body;

    const user = await User.findById(userId);
    if (!user) {
      return res.status(404).json({ message: 'User not found' });
    }

    // Update allowed fields only
    if (updates.name !== undefined) user.name = updates.name;
    if (updates.email !== undefined) user.email = updates.email;
    if (updates.isAdmin !== undefined) user.isAdmin = updates.isAdmin;
    if (updates.points !== undefined) user.points = updates.points;
    if (updates.isBlocked !== undefined) user.isBlocked = updates.isBlocked;

    await user.save();
    res.json(user);
  } catch (error) {
    console.error('Error updating user:', error);
    res.status(500).json({ message: 'Server error updating user' });
  }
};

// Delete user by ID
exports.deleteUser = async (req, res) => {
  try {
    const userId = req.params.id;

    const user = await User.findById(userId);
    if (!user) {
      return res.status(404).json({ message: 'User not found' });
    }

    await user.remove();
    res.json({ message: 'User deleted successfully' });
  } catch (error) {
    console.error('Error deleting user:', error);
    res.status(500).json({ message: 'Server error deleting user' });
  }
};

// Get admin dashboard stats
exports.getStats = async (req, res) => {
  try {
    const totalUsers = await User.countDocuments();
    const totalActions = await Action.countDocuments();
    const goals = await Goal.find({});
    const goalsCreated = goals.length;
    const goalsCompleted = goals.filter(g => g.status === 'completed').length;

    const carbonSaved = goals.reduce((sum, g) => g.category === 'carbon' ? sum + g.currentValue : sum, 0);
    const waterSaved = goals.reduce((sum, g) => g.category === 'water' ? sum + g.currentValue : sum, 0);
    const wasteReduced = goals.reduce((sum, g) => g.category === 'waste' ? sum + g.currentValue : sum, 0);

    res.json({
      totalUsers: totalUsers,
      totalActions: totalActions,
      goalsCreated: goalsCreated,
      goalsCompleted: goalsCompleted,
      carbonSaved: carbonSaved,
      waterSaved: waterSaved,
      wasteReduced: wasteReduced
    });
  } catch (err) {
    console.error('Failed to fetch admin stats', err);
    res.status(500).json({ error: 'Failed to fetch admin stats' });
  }
};
