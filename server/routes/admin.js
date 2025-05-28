const express = require('express');
const router = express.Router();
const isAdmin = require('../middleware/isAdmin');
const eventController = require('../controllers/eventController');
const rewardController = require('../controllers/rewardController');

// Event routes (admin only)
router.get('/events', isAdmin, eventController.getEvents);
router.get('/events/:id', isAdmin, eventController.getEventById);
router.post('/events', isAdmin, eventController.createEvent);
router.put('/events/:id', isAdmin, eventController.updateEvent);
router.delete('/events/:id', isAdmin, eventController.deleteEvent);

// Reward routes (admin only)
router.get('/rewards', isAdmin, rewardController.getRewards);
router.get('/rewards/:id', isAdmin, rewardController.getRewardById);
router.post('/rewards', isAdmin, rewardController.createReward);
router.put('/rewards/:id', isAdmin, rewardController.updateReward);
router.delete('/rewards/:id', isAdmin, rewardController.deleteReward);

module.exports = router;
