const Action = require('../models/Action');
const { calculateStreak } = require('../utils/streakHelper');
const { calculatePoints } = require('../utils/pointsCalculator');

exports.getDashboardStats = async (req, res) => {
  try {
    const userId = req.user._id;

    const actions = await Action.find({ user: userId }).sort({ createdAt: -1 });

    const recentActions = actions.slice(0, 5);

    const actionsByCategory = actions.reduce((acc, curr) => {
      acc[curr.category] = (acc[curr.category] || 0) + 1;
      return acc;
    }, {});

    const categoryStats = Object.entries(actionsByCategory).map(([category, count]) => ({
      category,
      count
    }));

    const actionDates = actions.map(a => a.createdAt).sort((a, b) => new Date(b) - new Date(a));
    const streak = calculateStreak(actionDates);
    const totalPoints = calculatePoints(actions);

    res.json({
      recentActions,
      actionsByCategory: categoryStats,
      streak,
      actionsCount: actions.length,
      totalPoints
    });
  } catch (err) {
    console.error('Dashboard Error:', err);
    res.status(500).json({ message: 'Failed to load dashboard data' });
  }
};
