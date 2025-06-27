const mongoose = require('mongoose');
const User = require('../models/User');
require('dotenv').config();

const MONGO_URI = process.env.MONGO_URI || 'mongodb://localhost:27017/green-points';

const listUsers = async () => {
  try {
    await mongoose.connect(MONGO_URI);
    console.log('Connected to MongoDB for listing users');

    const users = await User.find().limit(10);
    console.log('Users found:', users.length);
    users.forEach(user => {
      console.log(`User: ${user._id}, Name: ${user.name}, Email: ${user.email}`);
    });

    process.exit(0);
  } catch (err) {
    console.error('Error listing users:', err);
    process.exit(1);
  }
};

listUsers();
