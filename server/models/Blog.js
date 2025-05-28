const mongoose = require('mongoose');

const blogSchema = new mongoose.Schema({
  title: String,
  summary: String,
  tag: String,
  image: String,
  author: String,
  date: Date,
  approved: { type: Boolean, default: false },
});

module.exports = mongoose.model('Blog', blogSchema);
