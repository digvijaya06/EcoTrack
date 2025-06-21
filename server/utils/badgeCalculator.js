const badgeRules = [
  {
    name: 'Eco Warrior',
    description: 'Earn 100 or more points',
    condition: (user) => user.points >= 100,
    rarity: 'Epic',
    icon: '🌍'
  },
  {
    name: 'Carbon Neutral',
    description: 'Save 1000 kg of CO₂',
    condition: (user) => user.co2Saved >= 1000,
    rarity: 'Rare',
    icon: '🌱'
  },
  {
    name: 'Energy Saver',
    description: 'Earn 50 or more points in Energy category',
    condition: (user) => user.energyPoints >= 50,
    rarity: 'Common',
    icon: '⚡'
  },
  {
    name: 'Recycling Champion',
    description: 'Recycle 100 or more items',
    condition: (user) => user.recyclingCount >= 100,
    rarity: 'Epic',
    icon: '♻️'
  },
  {
    name: 'Water Guardian',
    description: 'Save 5000 liters of water',
    condition: (user) => user.waterSaved >= 5000,
    rarity: 'Rare',
    icon: '💧'
  }
];

// Function to calculate badges based on user data
function calculateBadges(user) {
  const earnedBadges = [];

  badgeRules.forEach((badge) => {
    try {
      if (badge.condition(user)) {
        earnedBadges.push({
          name: badge.name,
          description: badge.description,
          rarity: badge.rarity,
          icon: badge.icon,
          earned: true
        });
      }
    } catch (error) {
      // Ignore errors in condition evaluation
      console.error('Error evaluating badge condition:', error);
    }
  });

  return earnedBadges;
}

module.exports = { calculateBadges };
