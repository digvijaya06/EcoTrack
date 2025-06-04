// Calculates streak based on recent action dates
function calculateStreak(actionDates) {
  const today = new Date().setHours(0, 0, 0, 0);
  let streak = 0;

  for (let i = 0; i < actionDates.length; i++) {
    const diff = today - new Date(actionDates[i]).setHours(0, 0, 0, 0);
    const daysAgo = diff / (1000 * 60 * 60 * 24);

    if (daysAgo === streak) {
      streak++;
    } else {
      break;
    }
  }

  return streak;
}

module.exports = { calculateStreak };
