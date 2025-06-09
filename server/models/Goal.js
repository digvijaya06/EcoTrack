const mongoose = require('mongoose');

const goalSchema = new mongoose.Schema({
  title: { type: String, required: true },
  category: { type: String, required: true },
  completed: { type: Boolean, default: false },
  progress: { type: Number, default: 0 },
  target: { type: Number, default: 1 },
  status: { type: String, default: 'In Progress' },
  deadline: { type: Date, default: null },
  userId: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true },
  isVerified:{type:Boolean, default:false},
  verificationNote:{type:String, default: ''},
  progressHistory: [
    {
      value: { type: Number, required: true },
      timestamp: { type: Date, default: Date.now }
    }
  ]
}, { timestamps: true });

module.exports = mongoose.model('Goal', goalSchema);
