const mongoose = require('mongoose');
const User = require('../models/User');
const Action = require('../models/Action');
const Goal = require('../models/Goal');
const ContactSubmission = require('../models/ContactSubmission');



// Get all users with additional stats
exports.getUsers = async (req, res) => {
  try {
    const { searchTerm, role, status, sortBy } = req.query;

    // Build query object
    const query = {};

    // Filter by role
    if (role === 'Admin') {
      query.isAdmin = true;
    } else if (role === 'User') {
      query.isAdmin = { $ne: true };
    } else {
      // If no role filter, exclude admins by default
      query.isAdmin = { $ne: true };
    }

    // Filter by status
    if (status === 'Active') {
      query.isBlocked = false;
    } else if (status === 'Banned') {
      query.isBlocked = true;
    }

    // Search by name or email
    if (searchTerm) {
      query.$or = [
        { name: { $regex: searchTerm, $options: 'i' } },
        { email: { $regex: searchTerm, $options: 'i' } }
      ];
    }

    // Fetch users based on query
    let users = await User.find(query)
      .select('name email isAdmin isBlocked createdAt bio website location')
      .lean();

    // Fetch action counts grouped by user
    const actionsCounts = await Action.aggregate([
      {
        $group: {
          _id: '$user',
          count: { $sum: 1 }
        }
      }
    ]);

    // Map userId to count for quick lookup
    const actionsCountMap = {};
    actionsCounts.forEach(ac => {
      actionsCountMap[ac._id.toString()] = ac.count;
    });

    // Fetch goals grouped by user
    const goals = await Goal.find().lean();

    // Map userId to goals array
    const goalsMap = {};
    goals.forEach(goal => {
      const userId = goal.userId.toString();
      if (!goalsMap[userId]) goalsMap[userId] = [];
      goalsMap[userId].push(goal);
    });

    // Merge data
    users = users.map(user => {
      const userIdStr = user._id.toString();
      const userGoals = goalsMap[userIdStr] || [];
      const goalsCreated = userGoals.length;
      const goalsCompleted = userGoals.filter(g => g.status === 'completed').length;
      const totalActionsLogged = actionsCountMap[userIdStr] || 0;

      return {
        ...user,
        totalActionsLogged,
        goalsCreated,
        goalsCompleted
      };
    });

    // Sort users
    if (sortBy === 'dateJoined') {
      users.sort((a, b) => new Date(b.createdAt) - new Date(a.createdAt));
    } else if (sortBy === 'activityCount') {
      users.sort((a, b) => b.totalActionsLogged - a.totalActionsLogged);
    }

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

// Get all contact submissions
exports.getContactSubmissions = async (req, res) => {
  try {
    const submissions = await ContactSubmission.find().sort({ createdAt: -1 });
    res.json(submissions);
  } catch (error) {
    console.error('Error fetching contact submissions:', error);
    res.status(500).json({ message: 'Server error fetching contact submissions' });
  }
};

// Update contact submission status
exports.updateContactSubmissionStatus = async (req, res) => {
  try {
    const submissionId = req.params.id;
    const { status } = req.body;

    if (!['Pending', 'Resolved'].includes(status)) {
      return res.status(400).json({ message: 'Invalid status value' });
    }

    const submission = await ContactSubmission.findById(submissionId);
    if (!submission) {
      return res.status(404).json({ message: 'Contact submission not found' });
    }

    submission.status = status;
    await submission.save();

    res.json(submission);
  } catch (error) {
    console.error('Error updating contact submission status:', error);
    res.status(500).json({ message: 'Server error updating contact submission status' });
  }
};
