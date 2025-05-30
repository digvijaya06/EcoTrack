const dotenv = require('dotenv');
const express = require("express");
const mongoose = require("mongoose");
const cors = require("cors");

dotenv.config();
const app = express();


if (!process.env.JWT_SECRET) {
  console.warn('Warning: JWT_SECRET is not set. Using default secret for development/testing.');
  process.env.JWT_SECRET = 'default_jwt_secret_key_change_me';
}

//Middleware
app.use(cors());
app.use(express.json());

//Routes

const adminRoutes = require('./routes/admin');
app.use('/api/admin', adminRoutes);


// API base URL for authentication routes
const authRoutes = require('./routes/auth');
app.use('/api/auth',authRoutes);

// API base URL for dashboard routes
const dashboard= require('./routes/dashboard');
app.use('/api', dashboard); 

// API base URL for reward routes
const reward= require('./routes/reward');
app.use('/api/rewards', reward); 

// API base URL for action routes
const action = require('./routes/action');
app.use('/api/actions', action); 

// Error handling middleware
app.use((err, req, res, next) => {
  console.error('Unhandled error:', err.stack || err);
  res.status(500).json({ message: 'Internal server error' });
});

 // Start Server
const PORT = process.env.PORT || 5000;

console.log('MONGO_URI:', process.env.MONGO_URI);

// Connect DB
mongoose.connect(process.env.MONGO_URI, { useNewUrlParser: true, useUnifiedTopology: true })
  .then(() => console.log("MongoDB connected"))
  .catch((err) => console.error(err));

app.get("/", (req, res) => res.send("GreenPoints API Running"));

app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
  