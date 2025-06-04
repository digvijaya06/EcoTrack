function calculatePoints(actions) {
  return actions.reduce((total, action) => {
    return total + (action.points || 0);
  }, 0);
}

module.exports = { calculatePoints };
