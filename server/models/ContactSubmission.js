const mongoose = require('mongoose');

const ContactSubmissionSchema = new mongoose.Schema({
  userId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User',
    required: false,
  },
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
  status: {
    type: String,
    enum: ['Pending', 'Resolved'],
    default: 'Pending',
  },
}, { timestamps: true });

module.exports = mongoose.model('ContactSubmission', ContactSubmissionSchema);
