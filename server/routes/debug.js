const express = require('express');
const router = express.Router();
const Challenge = require('../models/Challenge');

// Debug route to list all challenges
router.get('/debug/challenges', async (req, res) => {
  try {
    const challenges = await Challenge.find({});
    res.json(challenges);
  } catch (error) {
    console.error('Error fetching challenges:', error);
    res.status(500).json({ message: 'Server error' });
  }
});

module.exports = router;
