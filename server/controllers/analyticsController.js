const Action = require('../models/Action');
const Goal = require('../models/Goal');
const UserQuestionResponse = require('../models/UserQuestionResponse');

// Existing user-specific endpoints
exports.getKPIs = async (req, res) => {
  try {
    const totalActions = await Action.countDocuments({ user: req.user._id });
    const totalPoints = await Action.aggregate([
      { $match: { user: req.user._id } },
      { $group: { _id: null, totalPoints: { $sum: '$points' } } }
    ]);
    res.json({
      totalActions,
      totalPoints: totalPoints.length > 0 ? totalPoints[0].totalPoints : 0,
    });
  } catch (error) {
    console.error('Get KPIs Error:', error);
    res.status(500).json({ message: 'Server error' });
  }
};

exports.getMonthlyImpact = async (req, res) => {
  try {
    const monthlyImpact = await Action.aggregate([
      { $match: { user: req.user._id } },
      {
        $group: {
          _id: { year: { $year: '$createdAt' }, month: { $month: '$createdAt' } },
          totalPoints: { $sum: '$points' }
        }
      },
      { $sort: { '_id.year': 1, '_id.month': 1 } }
    ]);
    const formatted = monthlyImpact.map(item => ({
      year: item._id.year,
      month: item._id.month,
      totalPoints: item.totalPoints
    }));
    res.json(formatted);
  } catch (error) {
    console.error('Get Monthly Impact Error:', error);
    res.status(500).json({ message: 'Server error' });
  }
};

// New overall analytics endpoints for all users

exports.getOverallGoalImpact = async (req, res) => {
  try {
    const totalActions = await Action.countDocuments({});
    const totalPoints = await Action.aggregate([
      { $group: { _id: null, totalPoints: { $sum: '$points' } } }
    ]);
    res.json({
      totalActions,
      totalPoints: totalPoints.length > 0 ? totalPoints[0].totalPoints : 0,
    });
  } catch (error) {
    console.error('Get Overall KPIs Error:', error);
    res.status(500).json({ message: 'Server error' });
  }
};

exports.getOverallMonthlyImpact = async (req, res) => {
  try {
    // Aggregate monthly impact from Actions only (Goal model does not have impact fields)
    const actionImpact = await Action.aggregate([
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

    // Convert aggregation result to sorted array by year and month
    const sortedArray = actionImpact.sort((a, b) => {
      if (a._id.year === b._id.year) {
        return a._id.month - b._id.month;
      }
      return a._id.year - b._id.year;
    });

    // Map to frontend expected format
    const formatted = sortedArray.map(item => ({
      year: item._id.year,
      month: item._id.month,
      carbonSaved: item.carbonSaved || 0,
      energySaved: item.energySaved || 0,
      waterSaved: item.waterSaved || 0,
      wasteReduced: item.wasteReduced || 0
    }));

    res.json(formatted);
  } catch (error) {
    console.error('Get Overall Monthly Impact Error:', error);
    res.status(500).json({ message: 'Server error' });
  }
};

exports.getWeeklyActivity = async (req, res) => {
  try {
    const weeklyActivity = await Action.aggregate([
      {
        $group: {
          _id: { dayOfWeek: { $dayOfWeek: '$createdAt' } },
          totalActions: { $sum: 1 },
          totalPoints: { $sum: '$points' }
        }
      },
      { $sort: { '_id.dayOfWeek': 1 } }
    ]);
    const dayNames = ['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat'];
    const formatted = weeklyActivity.map(item => ({
      day: dayNames[(item._id.dayOfWeek + 6) % 7],
      actions: item.totalActions,
      points: item.totalPoints
    }));
    res.json(formatted);
  } catch (error) {
    console.error('Get Weekly Activity Error:', error);
    res.status(500).json({ message: 'Server error' });
  }
};

exports.getActionCategories = async (req, res) => {
  try {
    const categories = await Action.aggregate([
      {
        $group: {
          _id: '$category',
          count: { $sum: 1 }
        }
      }
    ]);
    const totalCount = categories.reduce((acc, cur) => acc + cur.count, 0);

    // Map backend category keys to display names consistent with frontend
    const categoryDisplayMap = {
      'energy': 'Energy Conserved',
      'transport': 'Energy Conserved',
      'recycling': 'Waste Reduced',
      'water': 'Water Saved',
      'plantation': 'Total Carbon Saved',
      'nature': 'Total Carbon Saved',
      'Tree & Nature Care': 'Total Carbon Saved',
      'plastic-free lifestyle': 'Waste Reduced',
      'Waste Reduced': 'Waste Reduced',
      'Energy Conserved': 'Energy Conserved',
      'Water Saved': 'Water Saved',
      'Total Carbon Saved': 'Total Carbon Saved'
    };

    // Aggregate counts by display name
    const aggregatedCounts = {};

    categories.forEach(cat => {
      const displayName = categoryDisplayMap[cat._id] || cat._id;
      if (!aggregatedCounts[displayName]) {
        aggregatedCounts[displayName] = 0;
      }
      aggregatedCounts[displayName] += cat.count;
    });

    const formatted = Object.entries(aggregatedCounts).map(([name, count]) => ({
      name,
      count,
      value: ((count / totalCount) * 100).toFixed(2),
      color: getCategoryColor(name)
    }));

    res.json(formatted);
  } catch (error) {
    console.error('Get Action Categories Error:', error);
    res.status(500).json({ message: 'Server error' });
  }
};

function getCategoryColor(category) {
  const colors = {
    Recycling: '#22c55e',
    'Energy Saving': '#3b82f6',
    Transportation: '#f59e0b',
    'Water Conservation': '#8b5cf6'
  };
  return colors[category] || '#888888';
}

exports.getImpactData = async (req, res) => {
  try {
    // Example static data, replace with real aggregation if available
    const impactData = [
      { category: 'Carbon Footprint', current: 750, target: 1000, color: '#22c55e', unit: 'kg CO₂' },
      { category: 'Energy Usage', current: 600, target: 1000, color: '#3b82f6', unit: 'kWh' },
      { category: 'Waste Reduction', current: 850, target: 1000, color: '#f59e0b', unit: 'kg' },
      { category: 'Water Saved', current: 450, target: 1000, color: '#06b6d4', unit: 'liters' }
    ];
    res.json(impactData);
  } catch (error) {
    console.error('Get Impact Data Error:', error);
    res.status(500).json({ message: 'Server error' });
  }
};

exports.getAchievements = async (req, res) => {
  try {
    // Example static achievements, replace with real data if available
    const achievements = [
      { title: 'Carbon Neutral Week', description: 'Achieved net-zero carbon for 7 days', date: '2024-01-15', icon: 'Leaf' },
      { title: 'Energy Efficiency Master', description: 'Reduced energy usage by 30%', date: '2024-01-10', icon: 'Zap' },
      { title: 'Waste Warrior', description: 'Zero waste for 5 consecutive days', date: '2024-01-08', icon: 'Recycle' },
      { title: 'Water Conservation Champion', description: 'Saved 500L of water this month', date: '2024-01-05', icon: 'Droplets' }
    ];
    res.json(achievements);
  } catch (error) {
    console.error('Get Achievements Error:', error);
    res.status(500).json({ message: 'Server error' });
  }
};

// New controller function to save user question response
exports.saveUserQuestionResponse = async (req, res) => {
  try {
    const { question, response } = req.body;
    if (!question || !response) {
      return res.status(400).json({ message: 'Question and response are required' });
    }
    const newResponse = new UserQuestionResponse({
      userId: req.user._id,
      question,
      response
    });
    await newResponse.save();
    res.status(201).json({ message: 'Response saved successfully' });
  } catch (error) {
    console.error('Save User Question Response Error:', error);
    res.status(500).json({ message: 'Server error' });
  }
};

// New controller function to save multiple user question responses in batch
exports.saveUserQuestionResponsesBatch = async (req, res) => {
  try {
    const { responses } = req.body;
    if (!responses || !Array.isArray(responses) || responses.length === 0) {
      return res.status(400).json({ message: 'Responses array is required' });
    }
    const docs = responses.map(r => ({
      userId: req.user._id,
      question: r.question,
      response: r.response
    }));
    await UserQuestionResponse.insertMany(docs);
    res.status(201).json({ message: 'Batch responses saved successfully' });
  } catch (error) {
    console.error('Save Batch User Question Responses Error:', error);
    res.status(500).json({ message: 'Server error' });
  }
};

  
// New controller function to get summary analytics
exports.getSummary = async (req, res) => {
  try {
    const User = require('../models/User');
    const Action = require('../models/Action');
    const Goal = require('../models/Goal');

    const totalUsers = await User.countDocuments({});
    const totalActions = await Action.countDocuments({});
    const totalPointsAgg = await Action.aggregate([
      { $group: { _id: null, totalPoints: { $sum: '$points' } } }
    ]);
    const totalPoints = totalPointsAgg.length > 0 ? totalPointsAgg[0].totalPoints : 0;
    const totalGoals = await Goal.countDocuments({});

    res.json({
      totalUsers,
      totalActions,
      totalPoints,
      totalGoals
    });
  } catch (error) {
    console.error('Get Summary Analytics Error:', error);
    res.status(500).json({ message: 'Server error' });
  }
};

// New controller function to get goals analytics
exports.getGoalsAnalytics = async (req, res) => {
  try {
    const Goal = require('../models/Goal');

    // Total goals count
    const totalGoals = await Goal.countDocuments({});

    // Completed goals count
    const completedGoals = await Goal.countDocuments({ completed: true });

    // Completion rate
    const completionRate = totalGoals > 0 ? (completedGoals / totalGoals) * 100 : 0;

    // Category-wise stats: count and completion rate per category
    const categoryStatsAgg = await Goal.aggregate([
      {
        $group: {
          _id: '$category',
          total: { $sum: 1 },
          completed: { $sum: { $cond: ['$completed', 1, 0] } }
        }
      }
    ]);

    const categoryStats = categoryStatsAgg.map(cat => ({
      category: cat._id,
      total: cat.total,
      completed: cat.completed,
      completionRate: cat.total > 0 ? (cat.completed / cat.total) * 100 : 0
    }));

    res.json({
      totalGoals,
      completedGoals,
      completionRate,
      categoryStats
    });
  } catch (error) {
    console.error('Get Goals Analytics Error:', error);
    res.status(500).json({ message: 'Server error' });
  }
};

// New controller function to get aggregated user question responses
exports.getAggregatedUserQuestionResponses = async (req, res) => {
  try {
    const aggregatedData = await UserQuestionResponse.aggregate([
      {
        $group: {
          _id: '$question',
          total: { $sum: 1 },
          unit: { $first: '$unit' }
        }
      }
    ]);
    res.json(aggregatedData);
  } catch (error) {
    console.error('Get Aggregated User Question Responses Error:', error);
    res.status(500).json({ message: 'Server error' });
  }
};

// New endpoint to fetch raw actions for verification
exports.getRawActions = async (req, res) => {
  try {
    const actions = await Action.find({}, 'title category co2Saved energySaved wasteReduced createdAt').lean();
    res.json(actions);
  } catch (error) {
    console.error('Get Raw Actions Error:', error);
    res.status(500).json({ message: 'Server error' });
  }
};

