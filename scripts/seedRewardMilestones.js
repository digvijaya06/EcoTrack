const mongoose = require('mongoose');
const dotenv = require('dotenv');
const RewardMilestone = require('../server/models/RewardMilestone');

dotenv.config({ path: './server/.env' });

const rewardMilestones = [
  {
    title: 'Water Guardian',
    category: 'Water',
    target: 10000,
    description: 'Saved 10,000 L of water',
    imageUrl: '/uploads/rewards/save-water-.jpg'
  },
  {
    title: 'Carbon Neutral',
    category: 'Carbon',
    target: 1000,
    description: 'Offset 1 ton of CO₂ emissions',
    imageUrl: '/uploads/rewards/carbon.png'
  },
  {
    title: 'Energy Saver',
    category: 'Energy',
    target: 500,
    description: 'Saved 500 kWh of electricity',
    imageUrl: '/uploads/rewards/save-energy-.jpg'
  },
  {
    title: 'Recycling Champ',
    category: 'Waste',
    target: 1000,
    description: 'Recycled 1000 kg of waste',
    imageUrl: '/uploads/rewards/recycle-champion.jpeg'
  }
];

const seedRewardMilestones = async () => {
  try {
    await mongoose.connect(process.env.MONGO_URI);
    console.log('MongoDB connected for seeding reward milestones');

    const existing = await RewardMilestone.find();
    if (existing.length > 0) {
      console.log('Reward milestones already exist. Skipping seeding.');
      process.exit(0);
    }

    await RewardMilestone.insertMany(rewardMilestones);
    console.log('Reward milestones seeded successfully');
    process.exit(0);
  } catch (error) {
    console.error('Error seeding reward milestones:', error);
    process.exit(1);
  }
};

seedRewardMilestones();
