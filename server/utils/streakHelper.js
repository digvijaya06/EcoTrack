const Action = require('../models/Action');
const User = require('../models/User');

function isYesterday(date) {
  const yesterday = new Date();
  yesterday.setDate(yesterday.getDate() - 1);
  return date.toDateString() === yesterday.toDateString();
}

function calculateStreak(dates) {
  if (!dates || dates.length === 0) return 0;

  // Sort dates descending
  const sortedDates = dates
    .map(d => new Date(d).setHours(0, 0, 0, 0))
    .sort((a, b) => b - a);

  let streak = 1;
  for (let i = 1; i < sortedDates.length; i++) {
    if (sortedDates[i] === sortedDates[i - 1] - 86400000) { // 1 day in ms
      streak++;
    } else {
      break;
    }
  }
  return streak;
}

exports.updateUserStreaks = async () => {
  try {
    const users = await User.find();

    for (let user of users) {
      const actions = await Action.find({ userId: user._id }).sort({ createdAt: -1 });

      if (!actions.length) {
        user.stats = user.stats || {};
        user.stats.streak = 0;
        user.stats.lastActionDate = null;
        await user.save();
        continue;
      }

      const lastActionDateFromActions = new Date(actions[0].createdAt);
      const lastActionDateFromUser = user.stats?.lastActionDate ? new Date(user.stats.lastActionDate) : null;
      const today = new Date();

      user.stats = user.stats || {};
      
      if (lastActionDateFromActions.toDateString() === today.toDateString()) {

       
        if (lastActionDateFromUser && lastActionDateFromUser.toDateString() === today.toDateString()) {

         
        } else if (lastActionDateFromUser && isYesterday(lastActionDateFromUser)) {

         
          user.stats.streak = (user.stats.streak || 0) + 1;
          user.stats.lastActionDate = today;
        } else {
          
          user.stats.streak = 1;
          user.stats.lastActionDate = today;
        }
      } else if (lastActionDateFromActions.toDateString() === (new Date(today.getFullYear(), today.getMonth(), today.getDate() - 1)).toDateString()) {

        
        user.stats.streak = (user.stats.streak || 0) + 1;
        user.stats.lastActionDate = lastActionDateFromActions;
      } else {

  
        user.stats.streak = 1;
        user.stats.lastActionDate = lastActionDateFromActions;
      }

      await user.save();
    }

    console.log(' Streaks updated for users');
  } catch (error) {
    console.error(' Error updating streaks:', error);
  }
};

exports.calculateStreak = calculateStreak;
