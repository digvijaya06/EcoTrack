const mongoose = require('mongoose');
const dotenv = require('dotenv');
const Action = require('../models/Action');
const User = require('../models/User');

dotenv.config(); 

//  Connect to DB
mongoose.connect(process.env.MONGO_URI, {
  useNewUrlParser: true,
  useUnifiedTopology: true,
}).then(() => {
  console.log('Connected to MongoDB:', mongoose.connection.name);
  seedActions(); 
}).catch((err) => {
  console.error(' MongoDB connection error:', err);
  process.exit(1);
});

const seedActions = async () => {
  try {
    const user = await User.findOne(); 
    if (!user) {
      console.log('No user found. Please register a user first.');
      process.exit();
    }

    const sampleActions = [
      {
        user: user._id,
        title: 'Planted a Neem Tree',
        type: 'Tree Plantation',
        category: 'plantation',
        points: 20,
        notes: 'Planted a neem sapling in my backyard.',
      },
      {
        user: user._id,
        title: 'Used bicycle for commute',
        type: 'Transport',
        category: 'transport',
        points: 10,
        notes: 'No carbon emission today.',
      },
    ];

    await Action.insertMany(sampleActions);
    console.log('Sample actions inserted!');
    process.exit();
  } catch (error) {
    console.error('Error inserting actions:', error);
    process.exit(1);
  }
};
