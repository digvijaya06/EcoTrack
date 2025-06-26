const mongoose = require('mongoose');

const userQuestionResponseSchema = new mongoose.Schema({
  userId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User',
    required: true
  },
  question: {
    type: String,
    required: true
  },
  response: {
    type: String,
    required: true
  },
  createdAt: {
    type: Date,
    default: Date.now
  }
});

const UserQuestionResponse = mongoose.model('UserQuestionResponse', userQuestionResponseSchema);

module.exports = UserQuestionResponse;
