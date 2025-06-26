const express = require('express');
const router = express.Router();
const protect = require('../middleware/authMiddleware');
const goalController = require('../controllers/goalController');

// Consolidated routes from both goal.js and goals.js

// Routes with protection middleware
router.get('/', protect, goalController.getGoalsByUser);
router.post('/', protect, goalController.createGoal);
router.put('/:id', protect, goalController.updateGoal);
router.delete('/:id', protect, goalController.deleteGoal);

// Impact route
router.get('/impact', protect, goalController.getGoalsImpact);

module.exports = router;
