const mongoose = require('mongoose');

const applicationSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true,
  },
  email: {
    type: String,
    required: true,
  },
  message: {
    type: String,
    required: true,
  },
  role: {
    type: String,
    required: true,
  },
}, { timestamps: true });

const Application = mongoose.model('Application', applicationSchema);

module.exports = Application;
