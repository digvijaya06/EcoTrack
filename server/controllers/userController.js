const User = require('../models/User');

exports.getProfile = async (req, res) => {
  try {
    const user = await User.findById(req.user._id).select('-password');
    if (!user) return res.status(404).json({ message: 'User not found' });
    res.json(user);
  } catch (error) {
    console.error('Get Profile Error:', error);
    res.status(500).json({ message: 'Server error' });
  }
};

exports.updateProfile = async (req, res) => {
  try {
    const { name, location, bio, website, avatar } = req.body;

    const user = await User.findById(req.user._id);
    if (!user) return res.status(404).json({ message: 'User not found' });

    user.name = name ?? user.name;
    user.location = location ?? user.location;
    user.bio = bio ?? user.bio;
    user.website = website ?? user.website;
    user.avatar = avatar ?? user.avatar;

    await user.save();
    res.json(user);
  } catch (error) {
    console.error('Update Profile Error:', error);
    res.status(500).json({ message: 'Server error' });
  }
};

exports.getBadges = async (req, res) => {
  try {
    const user = await User.findById(req.user._id).select('badges');
    if (!user) return res.status(404).json({ message: 'User not found' });
    res.json({ badges: user.badges });
  } catch (error) {
    console.error('Get Badges Error:', error);
    res.status(500).json({ message: 'Server error' });
  }
};

// GET /api/users/me/achievements
// Returns user achievements (badges)
const Reward = require('../models/Reward');
const { assignBadges } = require('../utils/badgeCalculator');

exports.getAchievements = async (req, res) => {
  try {
    const user = await User.findById(req.user._id).select('badges points stats');
    if (!user) return res.status(404).json({ message: 'User not found' });

    // Dynamically assign badges based on points or rank
    const earnedBadgeTitles = await assignBadges(user);

    // Fetch badge metadata for earned badges
    const badgesMetadata = await Reward.find({
      title: { $in: earnedBadgeTitles }
    });

    res.json({
      badges: badgesMetadata,
      points: user.points,
      stats: user.stats
    });
  } catch (error) {
    console.error('Get Achievements Error:', error);
    res.status(500).json({ message: 'Server error' });
  }
};
