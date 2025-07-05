const mongoose = require('mongoose');

const categoryTargetSchema = new mongoose.Schema({
  category: {
    type: String,
    required: true,
    unique: true,
  },
  targetPoints: {
    type: Number,
    required: true,
  },
  createdAt: {
    type: Date,
    default: Date.now,
  },
});

const CategoryTarget = mongoose.model('CategoryTarget', categoryTargetSchema);

module.exports = CategoryTarget;
