const mongoose = require('mongoose');
const dotenv = require('dotenv');
const Resource = require('../models/Resource');
const Event = require('../models/Event');

dotenv.config();

const MONGO_URI = process.env.MONGO_URI || 'mongodb://localhost:27017/ecolog';

const sampleResources = [
  {
    title: 'Government Climate Policy PDF',
    description: 'Official government document outlining climate policies.',
    type: 'download',
    url: 'https://example.com/climate-policy.pdf',
    imageUrl: 'https://example.com/images/climate-policy.jpg',
    tags: ['government', 'policy', 'pdf'],
  },
  {
    title: 'How-to Guide for Eco-Habits',
    description: 'A comprehensive guide to adopting eco-friendly habits.',
    type: 'guide',
    url: 'https://example.com/eco-habits-guide',
    imageUrl: 'https://example.com/images/eco-habits.jpg',
    tags: ['guide', 'eco', 'habits'],
  },
  {
    title: 'Carbon Footprint Calculator',
    description: 'An online tool to calculate your carbon footprint.',
    type: 'link',
    url: 'https://carbonfootprintcalculator.com',
    imageUrl: 'https://example.com/images/carbon-calculator.jpg',
    tags: ['tool', 'calculator', 'carbon'],
  },
];

const sampleEvents = [
  {
    title: 'Sustainability Workshop',
    description: 'Learn sustainable living practices in this interactive workshop.',
    date: new Date(Date.now() + 7 * 24 * 60 * 60 * 1000), // 1 week from now
    location: 'Community Center',
  },
  {
    title: 'Webinar on Climate Change',
    description: 'Join experts discussing the latest in climate science.',
    date: new Date(Date.now() + 14 * 24 * 60 * 60 * 1000), // 2 weeks from now
    location: 'Online',
  },
];

const seedData = async () => {
  try {
    await mongoose.connect(MONGO_URI);
    console.log('MongoDB connected');

    // Clear existing data
    await Resource.deleteMany();
    await Event.deleteMany();

    // Insert sample data
    await Resource.insertMany(sampleResources);
    await Event.insertMany(sampleEvents);

    console.log('Sample resources and events seeded successfully');
    process.exit();
  } catch (error) {
    console.error('Seeding error:', error);
    process.exit(1);
  }
};

seedData();
