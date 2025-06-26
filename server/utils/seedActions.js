const mongoose = require('mongoose');
const Action = require('../models/Action');

const seedActions = async () => {
  try {
    const actions = [
      {
        user: mongoose.Types.ObjectId(), // Replace with valid user ObjectId
        title: 'Energy Saving',
        type: 'Energy Saving',
        category: 'energy',
        points: 5,
        co2Saved: 15,
        energySaved: 50,
        wasteReduced: 0,
        notes: 'Saved 50 kWh electricity by turning off unused appliances',
        createdAt: new Date(),
      },
      {
        user: mongoose.Types.ObjectId(), // Replace with valid user ObjectId
        title: 'Waste Reduction',
        type: 'Recycling',
        category: 'recycling',
        points: 10,
        co2Saved: 10,
        energySaved: 0,
        wasteReduced: 20,
        notes: 'Recycled 20 kg of plastic waste',
        createdAt: new Date(),
      },
      {
        user: mongoose.Types.ObjectId(), // Replace with valid user ObjectId
        title: 'Water Conservation',
        type: 'Water Conservation',
        category: 'water',
        points: 5,
        co2Saved: 0,
        energySaved: 0,
        wasteReduced: 0,
        notes: 'Fixed leaking taps to save water',
        createdAt: new Date(),
      }
    ];

    await Action.insertMany(actions);
    console.log('Seeded actions successfully');
  } catch (error) {
    console.error('Error seeding actions:', error);
  }
};

module.exports = seedActions;
