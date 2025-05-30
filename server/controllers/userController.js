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
