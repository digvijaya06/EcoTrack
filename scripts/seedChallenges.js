const mongoose = require('mongoose');
const dotenv = require('dotenv');
const Challenge = require('../server/models/Challenge');

dotenv.config({ path: './server/.env' });

const challenges = [
  {
    title: 'Join Community',
    description: 'Participate in the community to earn points',
    category: 'community',
    targetPoints: 100,
    deadline: new Date('2025-12-31'),
  },
  {
    title: 'Reduce Carbon Footprint',
    description: 'Complete actions to reduce your carbon footprint',
    category: 'carbon',
    targetPoints: 200,
    deadline: new Date('2025-12-31'),
  },
  {
    title: 'Save Water',
    description: 'Take steps to conserve water',
    category: 'water',
    targetPoints: 150,
    deadline: new Date('2025-12-31'),
  }
];

async function seed() {
  try {
    await mongoose.connect(process.env.MONGO_URI);
    console.log('Connected to MongoDB');

    await Challenge.deleteMany({});
    console.log('Cleared existing challenges');

    await Challenge.insertMany(challenges);
    console.log('Seeded challenges successfully');

    process.exit(0);
  } catch (error) {
    console.error('Error seeding challenges:', error);
    process.exit(1);
  }
}

seed();
