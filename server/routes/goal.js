// routes/goal.js
const express = require('express');
const router = express.Router();
const goalController = require('../controllers/goalController');

console.log('goalController:', goalController); // Debug log to check imported object

// Routes
router.get('/:userId', goalController.getGoalsByUser);
router.post('/', goalController.createGoal);
router.put('/:id', goalController.updateGoal);
router.delete('/:id', goalController.deleteGoal);

module.exports = router;
