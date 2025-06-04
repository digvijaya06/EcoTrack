const calculateBadges = (goals) => {
  const badges = [];

  const completedGoals = goals.filter(goal => goal.completed);
  const completedCount = completedGoals.length;

  if (completedCount >= 5) {
    badges.push('Eco Achiever');
  }

  const completedEnergyGoals = completedGoals.filter(goal => goal.category === 'ENERGY').length;
  if (completedEnergyGoals >= 3) {
    badges.push('Green Warrior');
  }

  // Add more badge rules here as needed

  return badges;
};

module.exports = { calculateBadges };
