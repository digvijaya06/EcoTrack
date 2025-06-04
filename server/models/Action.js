const mongoose = require('mongoose');

const actionSchema = new mongoose.Schema({
  user: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true },
  title: { type: String, required: true },
  type: String,  // Action type like "Tree Plantation"
  category: { type: String, required: true }, // like "e-waste", "transport", etc.
  points: { type: Number, required: true },
  notes: { type: String },
  createdAt: { type: Date, default: Date.now }
});

module.exports = mongoose.model('Action', actionSchema);
