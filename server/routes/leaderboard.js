const express = require('express');
const router = express.Router();
const { getLeaderboard } = require('../controllers/leaderboardController');
const { protect } = require('../middleware/authMiddleware');

// Public leaderboard route
router.get('/', getLeaderboard);

module.exports = router;
