const mongoose = require('mongoose');

const resourceSchema = new mongoose.Schema({
  title: {
    type: String,
    required: true,
  },
  description: String,
  type: {
    type: String,
    enum: ['guide', 'download', 'link', 'workshop', 'event'],
    required: true,
  },
  url: {
    type: String,
    required: true,
  },
  imageUrl: String,
  tags: [String],
  date: Date,
  location: String,
  createdAt: {
    type: Date,
    default: Date.now,
  },
});

module.exports = mongoose.model('Resource', resourceSchema);
