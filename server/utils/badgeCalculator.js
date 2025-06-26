const Reward = require('../models/Reward');

/**
 * Assign badges to user based on points or community rank.
 * @param {Object} user - User object with points and rank.
 * @returns {Array} - Array of badge titles earned by the user.
 */
const assignBadges = async (user) => {
  const badgesEarned = [];

  // Fetch all rewards (badges)
  const allRewards = await Reward.find();

  // Example logic: assign badges based on points thresholds
  allRewards.forEach((reward) => {
    if (user.points >= reward.pointsRequired) {
      badgesEarned.push(reward.title);
    }
  });

  // Additional logic can be added for community rank or other criteria

  return badgesEarned;
};

module.exports = { assignBadges };
