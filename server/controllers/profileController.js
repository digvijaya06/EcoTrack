  const User = require('../models/User');

// GET Profile by user ID
exports.getProfile = async (req, res) => {
  try {
    const userId = req.user.id; // Assuming you're using JWT middleware
    const user = await User.findById(userId).select('-password');

    if (!user) return res.status(404).json({ message: 'User not found' });

    res.json(user);
  } catch (error) {
    res.status(500).json({ message: 'Server error' });
  }
};

// UPDATE Profile
exports.updateProfile = async (req, res) => {
  try {
    const userId = req.user.id;

    const { name, location, bio, website, avatar, gender } = req.body;

    const updatedUser = await User.findByIdAndUpdate(
      userId,
      { name, location, bio, website, avatar, gender },
      { new: true }
    ).select('-password');

    res.json(updatedUser);
  } catch (error) {
    res.status(500).json({ message: 'Failed to update profile' });
  }
};

//  Get all public profiles (for visitors - no login needed)
exports.getAllPublicProfiles = async (req, res) => {
  try {
    const users = await User.find({}, 'name bio avatar gender'); // Include gender
    res.json(users);
  } catch (error) {
    res.status(500).json({ message: 'Failed to fetch public profiles' });
  }
};
