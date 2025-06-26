const Action = require('../models/Action');
const User = require('../models/User');
const Goal = require('../models/Goal');
const { calculateStreak } = require('../utils/streakHelper');
const { calculatePoints } = require('../utils/pointsCalculator');

exports.getDashboardStats = async (req, res) => {
  try {
    const userId = req.user._id;
    const period = req.query.period || 'week'; // default to week
    const isAdmin = req.user.isAdmin;

    if (isAdmin) {
      // Admin: return platform-wide stats
      const totalUsers = await User.countDocuments();
      const totalActions = await Action.countDocuments();
      const totalGoals = await Goal.countDocuments();
      const completedGoals = await Goal.countDocuments({ completed: true });
      const totalCo2SavedAgg = await Action.aggregate([
        { $group: { _id: null, totalCo2Saved: { $sum: '$co2Saved' } } }
      ]);
      const totalCo2Saved = totalCo2SavedAgg.length > 0 ? totalCo2SavedAgg[0].totalCo2Saved : 0;

      // For charts, you might want to aggregate data by period, here simplified as empty array
      const weeklyProgress = [];

      res.json({
        totalUsers,
        totalActions,
        totalGoals,
        completedGoals,
        totalCo2Saved,
        weeklyProgress,
      });
    } else {
      // Regular user: return personal stats
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

      const today = new Date();

      let progressData = [];

      if (period === 'week') {
        // Calculate points per day for last 7 days
        const last7Days = [];
        for (let i = 6; i >= 0; i--) {
          const day = new Date(today);
          day.setDate(today.getDate() - i);
          last7Days.push(day);
        }

        const pointsPerDayMap = {};
        last7Days.forEach(day => {
          const key = day.toISOString().slice(0, 10); // YYYY-MM-DD
          pointsPerDayMap[key] = 0;
        });

        actions.forEach(action => {
          const actionDate = new Date(action.createdAt);
          const key = actionDate.toISOString().slice(0, 10);
          if (key in pointsPerDayMap) {
            pointsPerDayMap[key] += action.points;
          }
        });

        progressData = last7Days.map(day => {
          const key = day.toISOString().slice(0, 10);
          return {
            day: day.toLocaleDateString('en-US', { weekday: 'short' }),
            points: pointsPerDayMap[key] || 0
          };
        });
      } else if (period === 'month') {
        // Calculate points per day for current month
        const year = today.getFullYear();
        const month = today.getMonth();

        const daysInMonth = new Date(year, month + 1, 0).getDate();

        const pointsPerDayMap = {};
        for (let day = 1; day <= daysInMonth; day++) {
          const date = new Date(year, month, day);
          const key = date.toISOString().slice(0, 10);
          pointsPerDayMap[key] = 0;
        }

        actions.forEach(action => {
          const actionDate = new Date(action.createdAt);
          if (actionDate.getFullYear() === year && actionDate.getMonth() === month) {
            const key = actionDate.toISOString().slice(0, 10);
            if (key in pointsPerDayMap) {
              pointsPerDayMap[key] += action.points;
            }
          }
        });

        progressData = Object.keys(pointsPerDayMap).map(key => {
          const date = new Date(key);
          return {
            day: date.toLocaleDateString('en-US', { day: 'numeric' }),
            points: pointsPerDayMap[key]
          };
        });
      } else if (period === 'year') {
        // Calculate points per month for current year
        const year = today.getFullYear();

        const pointsPerMonthMap = {};
        for (let month = 0; month < 12; month++) {
          pointsPerMonthMap[month] = 0;
        }

        actions.forEach(action => {
          const actionDate = new Date(action.createdAt);
          if (actionDate.getFullYear() === year) {
            const month = actionDate.getMonth();
            pointsPerMonthMap[month] += action.points;
          }
        });

        const monthNames = ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec'];

        progressData = Object.keys(pointsPerMonthMap).map(month => ({
          day: monthNames[month],
          points: pointsPerMonthMap[month]
        }));
      }

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
        weeklyProgress: progressData,
        co2Saved: totalCo2Saved
      });
    }
  } catch (err) {
    console.error('Dashboard Error:', err.message);
    console.error(err.stack);
    if (req.user) {
      console.error('User info:', { id: req.user._id, isAdmin: req.user.isAdmin });
    } else {
      console.error('No user info in request');
    }
    res.status(500).json({ message: 'Failed to load dashboard data' });
  }
};
