const express = require('express');
const router = express.Router();
const profileController = require('../controllers/profileController');
const { protect, admin } = require('../middleware/authMiddleware'); // JWT check

// @route GET /api/profile
router.get('/', protect, profileController.getProfile);

// @route PUT /api/profile
router.put('/', protect, profileController.updateProfile);

// PUBLIC: Get all member profiles (for visitors)
router.get('/public', profileController.getAllPublicProfiles);

module.exports = router;
