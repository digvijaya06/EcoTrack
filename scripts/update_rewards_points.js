/**
 * Script to bulk update rewards in the database to set appropriate pointsRequired values.
 * Run this script with Node.js in the server environment.
 */

const mongoose = require('mongoose');
const Reward = require('../server/models/Reward');

const rewardsPointsMap = {
  "Eco-friendly Water Bottle": 100,
  "Tree Plantation Kit": 200,
  "Reusable Shopping Bag": 150,
  "Solar-Powered Lantern": 250,
  "Bamboo Toothbrush Set": 120,
  "Compost Bin": 180,
  "Organic Herb Seeds": 130,
  "Reusable Coffee Cup": 160,
  "Eco Notebook": 110,
  "LED Light Bulbs (Set of 6)": 140,
  "Recycled Fabric Tote Bag": 170,
  "Solar Charger": 220,
  "Organic Cotton T-Shirt": 190,
  "Beeswax Food Wraps": 210,
  "Electric Bicycle Helmet": 230,
  "Solar Garden Lights (Set of 10)": 240,
  "Recycled Plastic Outdoor Chair": 260,
  "Organic Coffee Beans (1kg)": 200,
  "Natural Beeswax Candle": 150,
  "Reusable Silicone Food Bags (Set of 5)": 180,
  "Eco Yoga Mat": 170,
  "Solar Powered Backpack": 220,
  "Organic Cotton Tote Bag": 190,
  "Eco-friendly Lunch Box": 160,
  "Reusable Bamboo Straw Set": 140,
  "Organic Herbal Tea Box": 130,
  "Compostable Phone Case": 150,
  "Recycled Paper Gift Wrap": 120,
  "Organic Cotton Socks (3 Pairs)": 110,
  "Solar-Powered Phone Charger": 210,
  "Organic Natural Soap Set": 130,
  "Eco-friendly Picnic Set": 140,
  "Organic Cotton Face Mask (Pack of 5)": 120,
  "Recycled Plastic Planter": 150,
  "Organic Cotton Apron": 160,
  "Solar-Powered Desk Fan": 200
};

async function updateRewardsPoints() {
  try {
    await mongoose.connect('mongodb+srv://dimple:CO2@cluster1.9s9t7uh.mongodb.net/green-points?retryWrites=true&w=majority&appName=Cluster1', {
    });

    console.log('Connected to MongoDB');

    for (const [title, cost] of Object.entries(rewardsPointsMap)) {
      const reward = await Reward.findOne({ title });
      if (reward) {
        reward.cost = cost;
        await reward.save();
        console.log(`Updated "${title}" with cost: ${cost}`);
      } else {
        console.log(`Reward with title "${title}" not found.`);
      }
    }

    console.log('Rewards points update completed.');
    process.exit(0);
  } catch (error) {
    console.error('Error updating rewards points:', error);
    process.exit(1);
  }
}

updateRewardsPoints();
