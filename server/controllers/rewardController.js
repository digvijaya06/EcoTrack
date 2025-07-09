const User = require('../models/User');
const RewardClaim = require('../models/RewardClaim');
const Reward = require('../models/Reward');

const nodemailer = require('nodemailer');
const multer = require('multer');
const path = require('path');
const fs = require('fs');

// Multer storage setup for reward images
const storage = multer.diskStorage({
  destination: function (req, file, cb) {
    const uploadPath = path.join(__dirname, '../public/uploads/rewards');
    if (!fs.existsSync(uploadPath)) {
      fs.mkdirSync(uploadPath, { recursive: true });
    }
    cb(null, uploadPath);
  },
  filename: function (req, file, cb) {
    const uniqueSuffix = Date.now() + '-' + Math.round(Math.random() * 1E9);
    const ext = path.extname(file.originalname);
    cb(null, file.fieldname + '-' + uniqueSuffix + ext);
  }
});

const upload = multer({ storage });

// Image upload handler for reward images
exports.uploadRewardImage = [
  upload.single('image'),
  (req, res) => {
    if (!req.file) {
      return res.status(400).json({ message: 'No image file uploaded' });
    }
    const imageUrl = `/uploads/rewards/${req.file.filename}`;
    res.json({ imageUrl });
  }
];

 // Get all rewards (admin only)
exports.fetchRewards = async (req, res) => {
  try {
    const rewards = await Reward.find();
    res.json(rewards);
  } catch (error) {
    console.error('Fetch Rewards Error:', error);
    res.status(500).json({ message: 'Server error' });
  }
};

// Get reward by ID (admin only)
exports.fetchRewardById = async (req, res) => {
  try {
    const reward = await Reward.findById(req.params.id);
    if (!reward) {
      return res.status(404).json({ message: 'Reward not found' });
    }
    res.json(reward);
  } catch (error) {
    console.error('Fetch Reward By ID Error:', error);
    res.status(500).json({ message: 'Server error' });
  }
};

// Update reward by ID (admin only)
exports.updateReward = async (req, res) => {
  try {
    const rewardId = req.params.id;
    const updateData = req.body;
    const updatedReward = await Reward.findByIdAndUpdate(rewardId, updateData, { new: true });
    if (!updatedReward) {
      return res.status(404).json({ message: 'Reward not found' });
    }
    res.json(updatedReward);
  } catch (error) {
    console.error('Update Reward Error:', error);
    res.status(500).json({ message: 'Server error' });
  }
};

// Create new reward (admin only)
exports.createReward = async (req, res) => {
  try {
    const rewardData = req.body;
    // Map Points to cost for backward compatibility if needed
    if (rewardData.Points !== undefined) {
      rewardData.Points = Number(rewardData.Points);
    }
    const newReward = new Reward(rewardData);
    await newReward.save();
    res.status(201).json(newReward);
  } catch (error) {
    console.error('Create Reward Error:', error.message, error.stack);
    res.status(500).json({ message: 'Server error', error: error.message });
  }
};

// Create a reward claim (user)
exports.createRewardClaim = async (req, res) => {
  try {
    const rewardClaim = new RewardClaim(req.body);
    await rewardClaim.save();
    res.status(201).json(rewardClaim);
  } catch (error) {
    console.error('Create Reward Claim Error:', error);
    res.status(500).json({ message: 'Server error' });
  }
};

/**
 * Get all category targets
 */
exports.getCategoryTargets = async (req, res) => {
  try {
    const targets = await CategoryTarget.find();
    res.json(targets);
  } catch (error) {
    console.error('Get Category Targets Error:', error);
    res.status(500).json({ message: 'Server error' });
  }
};

/**
 * Set or update category target points
 */
exports.setCategoryTarget = async (req, res) => {
  try {
    const { category, targetPoints } = req.body;
    let target = await CategoryTarget.findOne({ category });
    if (!target) {
      target = new CategoryTarget({ category, targetPoints });
    } else {
      target.targetPoints = targetPoints;
    }
    await target.save();
    res.json(target);
  } catch (error) {
    console.error('Set Category Target Error:', error);
    res.status(500).json({ message: 'Server error' });
  }
};

/**
 * Check user progress and assign rewards automatically
 */
exports.checkAndAssignRewards = async () => {
  try {
    const targets = await CategoryTarget.find();
    const users = await User.find();

    for (const user of users) {
      for (const target of targets) {
        const userPoints = user.impactProgressByCategory?.[target.category] || 0;
        if (userPoints >= target.targetPoints) {
          // Check if reward already assigned
          const existingClaim = await RewardClaim.findOne({
            user: user._id,
            category: target.category,
            approved: true,
          });
          if (!existingClaim) {
            // Assign reward (create RewardClaim)
            const reward = await Reward.findOne({ category: target.category });
            if (reward) {
              const newClaim = new RewardClaim({
                user: user._id,
                reward: reward._id,
                category: target.category,
                approved: true,
              });
              await newClaim.save();

              // Add badge to user badges
              await User.updateOne(
                { _id: user._id },
                { $addToSet: { badges: reward._id } }
              );
            }
          }
        }
      }
    }
  } catch (error) {
    console.error('Check and Assign Rewards Error:', error);
  }
};

// Approve badge for a user (admin only)
exports.approveBadge = async (req, res) => {
  try {
    const { userId, badgeId } = req.body;
    // Create or update RewardClaim for the user and badge
    let rewardClaim = await RewardClaim.findOne({ user: userId, reward: badgeId });
    if (!rewardClaim) {
      rewardClaim = new RewardClaim({ user: userId, reward: badgeId, approved: true });
    } else {
      rewardClaim.approved = true;
    }
    await rewardClaim.save();

    // Add badge to user's badges array if not already present
    await User.updateOne(
      { _id: userId },
      { $addToSet: { badges: badgeId } }
    );

    res.json({ message: 'Badge approved and added to user profile' });
  } catch (error) {
    console.error('Approve Badge Error:', error);
    res.status(500).json({ message: 'Server error' });
  }
};

// Send email with badge image (admin only)
exports.sendBadgeEmail = async (req, res) => {
  try {
    const { userEmail, badgeImageUrl } = req.body;
    // Configure nodemailer transporter (example using Gmail SMTP)
    const transporter = nodemailer.createTransport({
      service: 'gmail',
      auth: {
        user: process.env.EMAIL_USER,
        pass: process.env.EMAIL_PASS,
      },
    });
    const mailOptions = {
      from: process.env.EMAIL_USER,
      to: userEmail,
      subject: 'You have received a new badge!',
      html: `<p>Congratulations! You have been awarded a new badge.</p><img src="${badgeImageUrl}" alt="Badge Image" />`,
    };
    await transporter.sendMail(mailOptions);
    res.json({ message: 'Email sent' });
  } catch (error) {
    console.error('Send Badge Email Error:', error);
    res.status(500).json({ message: 'Server error' });
  }
};
// Get all users with impact progress and badge eligibility (admin only)
exports.getUsersWithEligibility = async (req, res) => {
  try {
    const users = await User.find().select('name email impactProgress badges impactProgressByCategory');
    
    // Dummy logic to calculate eligibility (update as needed)
    const usersWithEligibility = users.map(user => {
      const totalPoints = Object.values(user.impactProgressByCategory || {}).reduce((sum, val) => sum + val, 0);
      const thresholdsMet = totalPoints >= 1000; // example condition

      return {
        _id: user._id,
        name: user.name,
        email: user.email,
        impactProgress: totalPoints,
        badges: user.badges,
        thresholdsMet,
        approved: false,
      };
    });

    res.json(usersWithEligibility);
  } catch (error) {
    console.error('Get Users With Eligibility Error:', error);
    res.status(500).json({ message: 'Server error' });
  }
};

// Update threshold met status for a user (admin only)
exports.updateThresholdMet = async (req, res) => {
  try {
    const userId = req.params.userId;
    const { thresholdsMet } = req.body;

    // Update the user's thresholdsMet status
    const user = await User.findById(userId);
    if (!user) {
      return res.status(404).json({ message: 'User not found' });
    }

    // Assuming thresholdsMet is stored in user document, adjust as per actual schema
    user.thresholdsMet = thresholdsMet;
    await user.save();

    res.json({ message: 'Threshold Met status updated successfully' });
  } catch (error) {
    console.error('Update Threshold Met Error:', error);
    res.status(500).json({ message: 'Server error' });
  }
};

// Delete reward by ID (admin only)
exports.deleteReward = async (req, res) => {
  try {
    const rewardId = req.params.id;
    const deletedReward = await Reward.findByIdAndDelete(rewardId);
    if (!deletedReward) {
      return res.status(404).json({ message: 'Reward not found' });
    }
    res.json({ message: 'Reward deleted successfully' });
  } catch (error) {
    console.error('Delete Reward Error:', error);
    res.status(500).json({ message: 'Server error' });
  }
};
