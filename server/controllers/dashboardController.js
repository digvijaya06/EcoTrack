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

    // Calculate weekly progress: points per day for last 7 days
    const today = new Date();
    const last7Days = [];
    for (let i = 6; i >= 0; i--) {
      const day = new Date(today);
      day.setDate(today.getDate() - i);
      last7Days.push(day);
    }

    // Initialize points per day map
    const pointsPerDayMap = {};
    last7Days.forEach(day => {
      const key = day.toISOString().slice(0, 10); // YYYY-MM-DD
      pointsPerDayMap[key] = 0;
    });

    // Aggregate points per day
    actions.forEach(action => {
      const actionDate = new Date(action.createdAt);
      const key = actionDate.toISOString().slice(0, 10);
      if (key in pointsPerDayMap) {
        pointsPerDayMap[key] += action.points;
      }
    });

    // Format weekly progress data for frontend
    const weeklyProgress = last7Days.map(day => {
      const key = day.toISOString().slice(0, 10);
      return {
        day: day.toLocaleDateString('en-US', { weekday: 'short' }),
        points: pointsPerDayMap[key] || 0
      };
    });

    const actionDates = actions.map(a => a.createdAt).sort((a, b) => new Date(b) - new Date(a));
    const streak = calculateStreak(actionDates);
    const totalPoints = calculatePoints(actions);

    // Aggregate total CO2 saved
    const totalCo2Saved = actions.reduce((acc, curr) => acc + (curr.co2Saved || 0), 0);

    res.json({
      recentActions,
      actionsByCategory: categoryStats,
      streak,
      actionsCount: actions.length,
      totalPoints,
      weeklyProgress,
      co2Saved: totalCo2Saved
    });
  } catch (err) {
    console.error('Dashboard Error:', err);
    res.status(500).json({ message: 'Failed to load dashboard data' });
  }
};
