const express = require('express');
const router = express.Router();
const communityController = require('../controllers/communityController');
const protect = require('../middleware/authMiddleware');

// Public route to get community posts
router.get('/', communityController.getCommunityPosts);

// Protected route to create a community post
router.post('/', protect, communityController.createCommunityPost);

// Protected route to like a community post
router.post('/:id/like', protect, communityController.likeCommunityPost);

module.exports = router;
