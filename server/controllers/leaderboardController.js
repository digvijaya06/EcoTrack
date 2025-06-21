const User = require('../models/User');
const Action = require('../models/Action');

// GET /api/leaderboard?timeframe=all-time
// Returns leaderboard data based on timeframe (e.g., all-time, monthly)
exports.getLeaderboard = async (req, res) => {
  try {
    const timeframe = req.query.timeframe || 'all-time';

    // For simplicity, only implement all-time leaderboard
    // Aggregate user impact points from actions
    const leaderboardData = await Action.aggregate([
      {
        $group: {
          _id: '$user',
          totalPoints: { $sum: '$points' },
          actionCount: { $sum: 1 }
        }
      },
      { $sort: { totalPoints: -1 } },
      { $limit: 10 }
    ]);

    // Populate user details
    const userIds = leaderboardData.map(item => item._id);
    const users = await User.find({ _id: { $in: userIds } });

    // Map user details to leaderboard data
    const leaderboard = leaderboardData.map(item => {
      const user = users.find(u => u._id.equals(item._id));
      return {
        id: user ? user._id : null,
        name: user ? user.name : 'Unknown',
        avatar: user ? user.avatar : '',
        points: item.totalPoints,
        streak: user ? user.streak : 0,
        rank: null, // will set below
        badges: [] // placeholder, implement badge logic if needed
      };
    });

    // Assign ranks
    leaderboard.forEach((item, index) => {
      item.rank = index + 1;
    });

    res.json(leaderboard);
  } catch (error) {
    console.error('Get Leaderboard Error:', error);
    res.status(500).json({ message: 'Server error' });
  }
};
