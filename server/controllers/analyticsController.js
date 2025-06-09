const Action = require('../models/Action');
const Goal = require('../models/Goal');

// GET /api/analytics/kpis
// Returns KPIs like total carbon, energy, water saved, etc.
exports.getKPIs = async (req, res) => {
  try {
    // Example aggregation - adjust fields as per actual data tracked
    // Assuming points represent some impact metric
    const totalActions = await Action.countDocuments({ user: req.user._id });
    const totalPoints = await Action.aggregate([
      { $match: { user: req.user._id } },
      { $group: { _id: null, totalPoints: { $sum: '$points' } } }
    ]);

    // For demonstration, KPIs are total actions and total points
    res.json({
      totalActions,
      totalPoints: totalPoints.length > 0 ? totalPoints[0].totalPoints : 0,
      // Add other KPIs as needed
    });
  } catch (error) {
    console.error('Get KPIs Error:', error);
    res.status(500).json({ message: 'Server error' });
  }
};

// GET /api/analytics/monthly-impact
// Returns monthly impact data for area chart
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

    // Format data for frontend
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
