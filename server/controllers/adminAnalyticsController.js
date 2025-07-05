const Action = require('../models/Action');
const Goal = require('../models/Goal');
const User = require('../models/User');
const mongoose = require('mongoose');

exports.getImpactTrends = async (req, res) => {
  try {
    const { timeRange, category } = req.query;

    // Build match filter for time range
    let matchFilter = {};
    if (timeRange) {
      const now = new Date();
      let startDate;
      switch (timeRange) {
        case 'today':
          startDate = new Date(now.getFullYear(), now.getMonth(), now.getDate());
          break;
        case 'this_week':
          const day = now.getDay();
          startDate = new Date(now.getFullYear(), now.getMonth(), now.getDate() - day);
          break;
        case 'this_month':
          startDate = new Date(now.getFullYear(), now.getMonth(), 1);
          break;
        case 'last_30_days':
          startDate = new Date(now.getTime() - 30 * 24 * 60 * 60 * 1000);
          break;
        default:
          startDate = null;
      }
      if (startDate) {
        matchFilter.createdAt = { $gte: startDate };
      }
    }

    // Filter by category if provided
    if (category) {
      matchFilter.category = category;
    }

    console.log('Impact Trends matchFilter:', matchFilter);

    // Log count of matching Actions
    const actionCount = await Action.countDocuments(matchFilter);
    console.log('Matching Actions count:', actionCount);

    // Aggregate from Actions
    const actionImpact = await Action.aggregate([
      { $match: matchFilter },
      {
        $group: {
          _id: { year: { $year: '$createdAt' }, month: { $month: '$createdAt' } },
          carbonSaved: { $sum: '$co2Saved' },
          energySaved: { $sum: '$energySaved' },
          waterSaved: { $sum: '$waterSaved' },
          wasteReduced: { $sum: '$wasteReduced' }
        }
      }
    ]);
    console.log('Action Impact:', actionImpact);

    // Aggregate from Goals (only completed goals)
    const goalMatchFilter = { completed: true };
    if (matchFilter.createdAt) {
      goalMatchFilter.completedAt = matchFilter.createdAt;
    }
    if (category) {
      goalMatchFilter.category = category;
    }

    const goalImpact = await Goal.aggregate([
      { $match: goalMatchFilter },
      {
        $group: {
          _id: { year: { $year: '$completedAt' }, month: { $month: '$completedAt' } },
          carbonSaved: { $sum: '$currentValue.carbon' },
          energySaved: { $sum: '$currentValue.energy' },
          waterSaved: { $sum: '$currentValue.water' },
          wasteReduced: { $sum: '$currentValue.waste' }
        }
      }
    ]);

    // Combine actionImpact and goalImpact by year and month
    const combinedMap = new Map();

    actionImpact.forEach(item => {
      const key = item._id.year + '-' + item._id.month;
      combinedMap.set(key, {
        year: item._id.year,
        month: item._id.month,
        carbonSaved: item.carbonSaved || 0,
        energySaved: item.energySaved || 0,
        waterSaved: item.waterSaved || 0,
        wasteReduced: item.wasteReduced || 0
      });
    });

    goalImpact.forEach(item => {
      const key = item._id.year + '-' + item._id.month;
      if (combinedMap.has(key)) {
        const existing = combinedMap.get(key);
        existing.carbonSaved += item.carbonSaved || 0;
        existing.energySaved += item.energySaved || 0;
        existing.waterSaved += item.waterSaved || 0;
        existing.wasteReduced += item.wasteReduced || 0;
      } else {
        combinedMap.set(key, {
          year: item._id.year,
          month: item._id.month,
          carbonSaved: item.carbonSaved || 0,
          energySaved: item.energySaved || 0,
          waterSaved: item.waterSaved || 0,
          wasteReduced: item.wasteReduced || 0
        });
      }
    });

    // Convert map to sorted array
    const combinedArray = Array.from(combinedMap.values()).sort((a, b) => {
      if (a.year === b.year) {
        return a.month - b.month;
      }
      return a.year - b.year;
    });

    res.json(combinedArray);
  } catch (error) {
    console.error('Get Impact Trends Error:', error);
    res.status(500).json({ message: 'Server error' });
  }
};

// New endpoint to get total goals created and completed counts
exports.getGoalsSummary = async (req, res) => {
  try {
    const totalGoalsCreated = await Goal.countDocuments({});
    const totalGoalsCompleted = await Goal.countDocuments({ completed: true });

    res.json({
      totalGoalsCreated,
      totalGoalsCompleted
    });
  } catch (error) {
    console.error('Get Goals Summary Error:', error);
    res.status(500).json({ message: 'Server error' });
  }
};

exports.getTopUsers = async (req, res) => {
  try {
    const { timeRange, userType } = req.query;

    // Build match filter for time range
    let matchFilter = {};
    if (timeRange) {
      const now = new Date();
      let startDate;
      switch (timeRange) {
        case 'today':
          startDate = new Date(now.getFullYear(), now.getMonth(), now.getDate());
          break;
        case 'this_week':
          const day = now.getDay();
          startDate = new Date(now.getFullYear(), now.getMonth(), now.getDate() - day);
          break;
        case 'this_month':
          startDate = new Date(now.getFullYear(), now.getMonth(), 1);
          break;
        case 'last_30_days':
          startDate = new Date(now.getTime() - 30 * 24 * 60 * 60 * 1000);
          break;
        default:
          startDate = null;
      }
      if (startDate) {
        matchFilter.createdAt = { $gte: startDate };
      }
    }

    // Aggregate top users by number of actions logged, total carbon saved
    const topUsersByActions = await Action.aggregate([
      { $match: matchFilter },
      { $group: { _id: '$user', actionCount: { $sum: 1 }, totalCarbonSaved: { $sum: '$co2Saved' } } },
      { $sort: { actionCount: -1 } },
      { $limit: 10 }
    ]);

    const userIds = topUsersByActions.map(u => u._id);
    const users = await User.find({ _id: { $in: userIds } }, 'name email').lean();

    // Map user info to aggregation results
    const topUsers = topUsersByActions.map(u => {
      const user = users.find(user => user._id.toString() === u._id.toString());
      return {
        userId: u._id,
        name: user ? user.name : 'Unknown',
        email: user ? user.email : '',
        actionCount: u.actionCount,
        totalCarbonSaved: u.totalCarbonSaved
      };
    });

    // Get goals completed per user
    const goalsCompleted = await Goal.aggregate([
      { $match: { completed: true, user: { $in: userIds } } },
      { $group: { _id: '$user', completedGoals: { $sum: 1 } } }
    ]);

    // Map completed goals count to topUsers
    topUsers.forEach(user => {
      const goalData = goalsCompleted.find(g => g._id.toString() === user.userId.toString());
      user.goalsCompleted = goalData ? goalData.completedGoals : 0;
    });

    res.json(topUsers);
  } catch (error) {
    console.error('Get Top Users Error:', error);
    res.status(500).json({ message: 'Server error' });
  }
};

exports.getCategorySummary = async (req, res) => {
  try {
    // Aggregate goals count and completion rate per category
    const categoryStatsAgg = await Goal.aggregate([
      {
        $match: {
          category: { $exists: true, $ne: null, $ne: '' }
        }
      },
      {
        $group: {
          _id: { $toUpper: '$category' },
          total: { $sum: 1 },
          completed: { $sum: { $cond: ['$completed', 1, 0] } }
        }
      }
    ]);

    const categoryStats = categoryStatsAgg.map(cat => ({
      category: cat._id || 'Other',
      total: cat.total,
      completed: cat.completed,
      completionRate: cat.total > 0 ? (cat.completed / cat.total) * 100 : 0
    }));

    res.json(categoryStats);
  } catch (error) {
    console.error('Get Category Summary Error:', error);
    res.status(500).json({ message: 'Server error' });
  }
};

const Action = require('../models/Action');
const Goal = require('../models/Goal');
const User = require('../models/User');
const mongoose = require('mongoose');

// Existing exportAnalytics stub
exports.exportAnalytics = async (req, res) => {
  // TODO: Implement export functionality (CSV/PDF)
  res.status(501).json({ message: 'Export functionality not implemented yet' });
};

// Implement getSuspiciousActivity to flag suspicious users
exports.getSuspiciousActivity = async (req, res) => {
  try {
    // Example criteria:
    // - Users who add more than 10 actions per day
    // - Users who input unrealistic values (e.g., > 10000 kg carbon saved in a day)

    // Aggregate actions per user per day
    const suspiciousActions = await Action.aggregate([
      {
        $group: {
          _id: {
            user: '$user',
            day: { $dateToString: { format: '%Y-%m-%d', date: '$createdAt' } }
          },
          actionCount: { $sum: 1 },
          totalCarbonSaved: { $sum: '$co2Saved' }
        }
      },
      {
        $match: {
          $or: [
            { actionCount: { $gt: 10 } },
            { totalCarbonSaved: { $gt: 10000 } }
          ]
        }
      },
      {
        $lookup: {
          from: 'users',
          localField: '_id.user',
          foreignField: '_id',
          as: 'userInfo'
        }
      },
      {
        $unwind: '$userInfo'
      },
      {
        $project: {
          userId: '$_id.user',
          date: '$_id.day',
          actionCount: 1,
          totalCarbonSaved: 1,
          userName: '$userInfo.name',
          userEmail: '$userInfo.email'
        }
      }
    ]);

    res.json(suspiciousActions);
  } catch (error) {
    console.error('Get Suspicious Activity Error:', error);
    res.status(500).json({ message: 'Server error' });
  }
};

// Implement getTopGroups endpoint
exports.getTopGroups = async (req, res) => {
  try {
    const { timeRange } = req.query;

    // Build match filter for time range
    let matchFilter = {};
    if (timeRange) {
      const now = new Date();
      let startDate;
      switch (timeRange) {
        case 'today':
          startDate = new Date(now.getFullYear(), now.getMonth(), now.getDate());
          break;
        case 'this_week':
          const day = now.getDay();
          startDate = new Date(now.getFullYear(), now.getMonth(), now.getDate() - day);
          break;
        case 'this_month':
          startDate = new Date(now.getFullYear(), now.getMonth(), 1);
          break;
        case 'last_30_days':
          startDate = new Date(now.getTime() - 30 * 24 * 60 * 60 * 1000);
          break;
        default:
          startDate = null;
      }
      if (startDate) {
        matchFilter.createdAt = { $gte: startDate };
      }
    }

    // Aggregate top groups by number of actions logged, total carbon saved
    // Assuming 'group' field exists on Action model representing user's group
    const topGroupsByActions = await Action.aggregate([
      { $match: matchFilter },
      {
        $group: {
          _id: '$group',
          actionCount: { $sum: 1 },
          totalCarbonSaved: { $sum: '$co2Saved' }
        }
      },
      { $sort: { actionCount: -1 } },
      { $limit: 10 }
    ]);

    // Get goals completed per group
    // Assuming Goal model has 'group' field
    const groupIds = topGroupsByActions.map(g => g._id);
    const goalsCompleted = await Goal.aggregate([
      { $match: { completed: true, group: { $in: groupIds } } },
      { $group: { _id: '$group', completedGoals: { $sum: 1 } } }
    ]);

    // Map completed goals count to topGroups
    const topGroups = topGroupsByActions.map(group => {
      const goalData = goalsCompleted.find(g => g._id.toString() === group._id.toString());
      return {
        groupId: group._id,
        name: group._id || 'Unknown Group',
        actionCount: group.actionCount,
        totalCarbonSaved: group.totalCarbonSaved,
        goalsCompleted: goalData ? goalData.completedGoals : 0
      };
    });

    res.json(topGroups);
  } catch (error) {
    console.error('Get Top Groups Error:', error);
    res.status(500).json({ message: 'Server error' });
  }
};
