const dotenv = require('dotenv');
const express = require("express");
const mongoose = require("mongoose");
const cors = require("cors");

dotenv.config({ path: './server/.env' });
console.log('Loaded MONGO_URI:', process.env.MONGO_URI);
const app = express();

// ====== JWT SECRET CHECK ======
if (!process.env.JWT_SECRET) {
  console.warn('Warning: JWT_SECRET is not set. Using default secret for development/testing.');
  process.env.JWT_SECRET = 'default_jwt_secret_key_change_me';
}

// ====== MIDDLEWARE ======
app.use(cors());                // Enable CORS for frontend
app.use(express.json());       // Parse JSON bodies

// ====== ROUTES ======

// Admin Routes
const adminRoutes = require('./routes/admin');
app.use('/api/admin', adminRoutes);

// Profile Routes (includes public and private)
const profileRoutes = require('./routes/profile');
app.use('/api/profile', profileRoutes); // 🔥 This includes `/api/profile/public`

// Auth Routes
const authRoutes = require('./routes/auth');
app.use('/api/auth', authRoutes);

// User Routes
const userRoutes = require('./routes/users');
app.use('/api/users', userRoutes);

// Dashboard Routes
const dashboard = require('./routes/dashboard');
app.use('/api', dashboard); 

// Reward Routes
const reward = require('./routes/reward');
app.use('/api/rewards', reward); 

// Action Routes
const action = require('./routes/action');
app.use('/api/actions', action); 



// ====== ERROR HANDLING ======
app.use((err, req, res, next) => {
  console.error('Unhandled error:', err.stack || err);
  res.status(500).json({ message: 'Internal server error' });
});

// ====== DATABASE + SERVER START ======
const PORT = process.env.PORT || 5000;

console.log('MONGO_URI:', process.env.MONGO_URI);

mongoose.connect(process.env.MONGO_URI, {
  useNewUrlParser: true,
  useUnifiedTopology: true
})
.then(() => {
  console.log("MongoDB connected");

  app.listen(PORT, () => {
    console.log(`Server running on port ${PORT}`);
  });
})
.catch((err) => {
  console.error('MongoDB connection failed:', err);
});
