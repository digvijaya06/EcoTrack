const mongoose = require('mongoose');
const bcrypt = require('bcryptjs');

const userSchema = new mongoose.Schema({
  // Basic Auth Info
  username: { type: String, required: true, unique: true },
  name: { type: String, required: true },
  email: { type: String, required: true, unique: true },
  password: { type: String, required: true },

  // Profile Info
  avatar: { type: String, default: '' }, // URL or cloudinary file path
  bio: { type: String, default: '' },
  location: { type: String, default: '' },
  website: { type: String, default: '' },
  gender: { type: String, enum: ['male', 'female', 'unknown'], default: 'unknown' },

  // Points/Rewards
  points: { type: Number, default: 0 },
  badges: { type: [String], default: [] },

  // Stats
  stats: {
    streak: { type: Number, default: 0 },
    lastActionDate: { type: Date, default: null }
  },

  // Admin and Timestamps
  isAdmin: { type: Boolean, default: false },
  role: { type: String, default: 'registered' },
  joinedAt: { type: Date, default: Date.now }

}, { timestamps: true });

// Hash password before saving
userSchema.pre('save', async function (next) {
  if (!this.isModified('password')) return next();
  const salt = await bcrypt.genSalt(10);
  this.password = await bcrypt.hash(this.password, salt);
  next();
});

// Password comparison method
userSchema.methods.comparePassword = async function (enteredPassword) {
  return await bcrypt.compare(enteredPassword, this.password);
};

module.exports = mongoose.model('User', userSchema);
