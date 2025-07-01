const mongoose = require('mongoose');
require('dotenv').config();

const MONGO_URI = process.env.MONGO_URI || 'mongodb://localhost:27017/green-points';

const Action = require('../models/Action');
const Goal = require('../models/Goal');
const User = require('../models/User');

const checkDataCounts = async () => {
  try {
    await mongoose.connect(MONGO_URI);
    console.log('Connected to MongoDB:', MONGO_URI);

    const actionCount = await Action.countDocuments();
    const goalCount = await Goal.countDocuments();
    const userCount = await User.countDocuments();

    console.log('Data counts:');
    console.log('Actions:', actionCount);
    console.log('Goals:', goalCount);
    console.log('Users:', userCount);

    await mongoose.disconnect();
  } catch (error) {
    console.error('Error checking data counts:', error);
    process.exit(1);
  }
};

checkDataCounts();
