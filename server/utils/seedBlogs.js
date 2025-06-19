const mongoose = require('mongoose');
const Blog = require('../models/Blog');
const sampleBlogs = require('../data/sampleBlogs.json');
require('dotenv').config();

const seedBlogs = async () => {
  try {
    await mongoose.connect(process.env.MONGO_URI, {
      useNewUrlParser: true,
      useUnifiedTopology: true,
    });

    console.log('MongoDB connected for seeding blogs');

    // Clear existing blogs
    await Blog.deleteMany({});

    // Insert sample blogs
    await Blog.insertMany(sampleBlogs);

    console.log('Sample blogs inserted successfully');
    process.exit();
  } catch (error) {
    console.error('Error seeding blogs:', error);
    process.exit(1);
  }
};

seedBlogs();
