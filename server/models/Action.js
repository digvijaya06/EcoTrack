const mongoose = require('mongoose');

const actionSchema = new mongoose.Schema({
  user: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true },
  title: { type: String, required: true },
  type: String,  // Action type like "Tree Plantation"
  category: { type: String, required: true }, // like "e-waste", "transport", etc.
  points: { type: Number, required: true },
  co2Saved: { type: Number, default: 0 },  // CO2 saved in kg
  energySaved: { type: Number, default: 0 }, // Energy saved in kWh
  wasteReduced: { type: Number, default: 0 }, // Waste reduced in kg
  notes: { type: String },
  linkedReward: { type: mongoose.Schema.Types.ObjectId, ref: 'Reward', required: false },
  createdAt: { type: Date, default: Date.now }
});

module.exports = mongoose.model('Action', actionSchema);
