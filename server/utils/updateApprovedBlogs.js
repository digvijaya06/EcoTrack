const mongoose = require('mongoose');
const Blog = require('../models/Blog');
require('dotenv').config();

const mongoURI = process.env.MONGO_URI || 'your_mongodb_connection_string_here';

const updateApprovedStatus = async () => {
  try {
    await mongoose.connect(mongoURI, {
      useNewUrlParser: true,
      useUnifiedTopology: true,
    });
    console.log('Connected to MongoDB');

    const result = await Blog.updateMany(
      { approved: false },
      { $set: { approved: true } }
    );

    console.log(`Updated ${result.modifiedCount} blog(s) to approved: true`);

    await mongoose.disconnect();
    console.log('Disconnected from MongoDB');
  } catch (error) {
    console.error('Error updating blogs:', error);
    process.exit(1);
  }
};

updateApprovedStatus();
