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
app.use(cors());                
app.use(express.json());      

// Serve static files from public folder (for uploaded images)
const path = require('path');
app.use('/uploads', express.static(path.join(__dirname, 'public/uploads')));

// ====== ROUTES ======

// Admin Routes
const adminRoutes = require('./routes/admin');
app.use('/api/admin', adminRoutes);

const adminActionsRoutes =require('./routes/adminActions')
app.use('/api/admin/actions', adminActionsRoutes);

// Admin Analytics Routes
const adminAnalyticsRoutes = require('./routes/adminAnalytics');
app.use('/admin/analytics', adminAnalyticsRoutes);



const blogRoutes = require('./routes/blog');
const communityRoutes = require('./routes/community');
const contactRoutes = require('./routes/contact');
const applicationRoutes = require('./routes/application');
const leaderboardRoutes = require('./routes/leaderboard');

app.use('/api/blogs', blogRoutes);
app.use('/api/community', communityRoutes);
app.use('/api/contact', contactRoutes);
app.use('/api/contact-submissions', contactRoutes);
app.use('/api/applications', applicationRoutes);
app.use('/api/leaderboard', leaderboardRoutes);

// Profile Routes (includes public and private)
const profileRoutes = require('./routes/profile');
app.use('/api/profile', profileRoutes); 
// Auth Routes
const authRoutes = require('./routes/auth');
app.use('/api/auth', authRoutes);

// User Routes
const userRoutes = require('./routes/users');
app.use('/api/users', userRoutes);

// Dashboard Routes
const dashboard = require('./routes/dashboard');
app.use('/api', dashboard); 

// Goal Routes
const goalRoutes = require('./routes/goals');
app.use('/api/goals', goalRoutes);

// Reward Routes
const reward = require('./routes/reward');
app.use('/api/rewards', reward); 

const actionRewardMapping = require('./routes/actionRewardMapping');
app.use('/api/action-reward-mapping', actionRewardMapping);



// Action Routes
const action = require('./routes/action');
app.use('/api/actions', action); 

// Analytics Routes
// Uncomment analytics routes to fix 404 errors
const analyticsRoutes = require('./routes/analytics');
app.use('/api/analytics', analyticsRoutes);

// Public Routes
const publicRoutes = require('./routes/public');
app.use('/api', publicRoutes);

const cron = require('node-cron');
const {updateUserStreaks} = require ('./utils/streakHelper');

//Run every day at midnight
cron.schedule('0 0 * * *', () => {
  console.log('Running daily streak updater...');
  updateUserStreaks();
});
// ====== ERROR HANDLING ======
app.use((err, req, res, next) => {
  console.error('Unhandled error:', err.stack || err);
  res.status(500).json({ message: 'Internal server error' });
});

// ====== DATABASE + SERVER START ======
const PORT = process.env.PORT || 5000;

console.log('MONGO_URI:', process.env.MONGO_URI);

mongoose.connect(process.env.MONGO_URI)
.then(() => {
  console.log("MongoDB connected");

  app.listen(PORT, () => {
    console.log(`Server running on port ${PORT}`);
  });
})
.catch((err) => {
  console.error('MongoDB connection failed:', err);
});
