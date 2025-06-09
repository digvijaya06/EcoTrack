// controllers/goalController.js
const Goal = require('../models/Goal');
const User = require('../models/User');
const { calculateBadges } = require('../utils/badgeCalculator');

const getGoalsByUser = async (req, res) => {
  try {
    const goals = await Goal.find({ userId: req.params.userId }).sort({ createdAt: -1 });
    res.json(goals);
  } catch (err) {
    res.status(500).json({ error: 'Failed to fetch goals' });
  }
};

const createGoal = async (req, res) => {
  try {
    const { title, category, targetValue, userId } = req.body;
    if (!title || !category || !targetValue || !userId) {
      return res.status(400).json({ error: 'Missing required fields' });
    }

    const newGoal = new Goal(req.body);
    const savedGoal = await newGoal.save();

    const userGoals = await Goal.find({ userId });
    const completedGoalsCount = userGoals.filter(g => g.completed).length;
    const currentGoalsCount = userGoals.filter(g => !g.completed).length;

    const user = await User.findById(userId);
    if (user) {
      user.stats = user.stats || {};
      user.stats.completedGoals = completedGoalsCount;
      user.stats.currentGoals = currentGoalsCount;
      await user.save();
    }

    res.status(201).json(savedGoal);
  } catch (err) {
    res.status(400).json({ error: 'Failed to create goal', details: err.message });
  }
};

const updateGoal = async (req, res) => {
  try {
    const goal = await Goal.findById(req.params.id);
    if (!goal) return res.status(404).json({ error: 'Goal not found' });

    if (req.body.progress !== undefined && req.body.progress !== goal.progress) {
      goal.progressHistory.push({
        value: req.body.progress,
        timestamp: new Date(),
      });
    }

    Object.assign(goal, req.body);
    const updatedGoal = await goal.save();

    const userId = updatedGoal.userId;
    const userGoals = await Goal.find({ userId });
    const badges = calculateBadges(userGoals);
    const completedGoalsCount = userGoals.filter(g => g.completed).length;
    const currentGoalsCount = userGoals.filter(g => !g.completed).length;

    const user = await User.findById(userId);
    if (user) {
      user.badges = badges;
      user.stats = user.stats || {};
      user.stats.completedGoals = completedGoalsCount;
      user.stats.currentGoals = currentGoalsCount;
      await user.save();
    }

    res.json(updatedGoal);
  } catch (err) {
    res.status(400).json({ error: 'Failed to update goal' });
  }
};


const deleteGoal = async (req, res) => {
  try {
    const goal = await Goal.findById(req.params.id);
    if (!goal) return res.status(404).json({ error: 'Goal not found' });

    const userId = goal.userId;
    await Goal.findByIdAndDelete(req.params.id);

    const userGoals = await Goal.find({ userId });
    const completedGoalsCount = userGoals.filter(g => g.completed).length;
    const currentGoalsCount = userGoals.filter(g => !g.completed).length;

    const user = await User.findById(userId);
    if (user) {
      user.stats = user.stats || {};
      user.stats.completedGoals = completedGoalsCount;
      user.stats.currentGoals = currentGoalsCount;
      await user.save();
    }

    res.json({ message: 'Goal deleted' });
  } catch (err) {
    res.status(400).json({ error: 'Failed to delete goal' });
  }
};


// GET /api/goals/impact
// Returns progress data for goals for progress bars
const getGoalsImpact = async (req, res) => {
  try {
    const goals = await Goal.find({ userId: req.user._id }).select('title progress target');
    res.json(goals);
  } catch (error) {
    console.error('Get Goals Impact Error:', error);
    res.status(500).json({ message: 'Server error' });
  }
};

module.exports = {
  getGoalsByUser,
  createGoal,
  updateGoal,
  deleteGoal,
  getGoalsImpact
};
