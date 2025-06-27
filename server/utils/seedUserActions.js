const mongoose = require('mongoose');
const User = require('../models/User');
const UserAction = require('../models/UserAction');
require('dotenv').config();

const MONGO_URI = process.env.MONGO_URI || 'mongodb://localhost:27017/green-points';

const seedUserActions = async () => {
  try {
    await mongoose.connect(MONGO_URI);
    console.log('Connected to MongoDB for seeding user actions');

    // Find some users to link actions to
    const users = await User.find().limit(4);
    if (users.length === 0) {
      console.log('No users found. Please create users first.');
      process.exit(1);
    }

    // Sample actions data
    const actionsData = [
      {
        user: users[0]._id,
        category: 'carbon',
        description: 'Planted trees to offset carbon emissions',
        status: 'Pending',
      },
      {
        user: users[1]._id,
        category: 'waste',
        description: 'Reduced plastic usage by switching to reusable bags',
        status: 'Pending',
      },
      {
        user: users[2]._id,
        category: 'carbon',
        description: 'Used a bike instead of a car for daily commute',
        status: 'Pending',
      },
      {
        user: users[3]._id,
        category: 'water',
        description: 'Installed a low-flow showerhead',
        status: 'Pending',
      },
    ];

    // Insert actions
    await UserAction.insertMany(actionsData);
    console.log('Seeded user actions successfully');

    process.exit(0);
  } catch (err) {
    console.error('Error seeding user actions:', err);
    process.exit(1);
  }
};

seedUserActions();
