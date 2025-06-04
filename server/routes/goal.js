const express = require('express');
const router = express.Router();
const Goal = require('../models/Goal');
const User = require('../models/User');
const { calculateBadges } = require('../utils/badgeCalculator');

// Get all goals for a user
router.get('/:userId', async (req, res) => {
  try {
    const goals = await Goal.find({ userId: req.params.userId }).sort({ createdAt: -1 });
    res.json(goals);
  } catch (err) {
    res.status(500).json({ error: 'Failed to fetch goals' });
  }
});

// Create new goal
router.post('/', async (req, res) => {
  try {
    const newGoal = new Goal(req.body);
    const savedGoal = await newGoal.save();
    res.status(201).json(savedGoal);
  } catch (err) {
    res.status(400).json({ error: 'Failed to create goal' });
  }
});

// Update goal (toggle complete, progress)
router.put('/:id', async (req, res) => {
  try {
    const goal = await Goal.findById(req.params.id);
    if (!goal) {
      return res.status(404).json({ error: 'Goal not found' });
    }

    // If progress is being updated, append to progressHistory
    if (req.body.progress !== undefined && req.body.progress !== goal.progress) {
      goal.progressHistory.push({
        value: req.body.progress,
        timestamp: new Date(),
      });
    }

    // Update other fields
    Object.assign(goal, req.body);
    const updatedGoal = await goal.save();

    // Recalculate badges for the user
    const userId = updatedGoal.userId;
    const userGoals = await Goal.find({ userId });
    const badges = calculateBadges(userGoals);

    const user = await User.findById(userId);
    if (user) {
      user.badges = badges;
      await user.save();
    }

    res.json(updatedGoal);
  } catch (err) {
    res.status(400).json({ error: 'Failed to update goal' });
  }
});

// Delete goal (optional)
router.delete('/:id', async (req, res) => {
  try {
    await Goal.findByIdAndDelete(req.params.id);
    res.json({ message: 'Goal deleted' });
  } catch (err) {
    res.status(400).json({ error: 'Failed to delete goal' });
  }
});

module.exports = router;
