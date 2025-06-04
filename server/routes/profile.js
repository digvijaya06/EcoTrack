const express = require('express');
const router = express.Router();
const profileController = require('../controllers/profileController');
const authMiddleware = require('../middleware/authMiddleware'); // JWT check

// @route GET /api/profile
router.get('/', authMiddleware, profileController.getProfile);

// @route PUT /api/profile
router.put('/', authMiddleware, profileController.updateProfile);

// PUBLIC: Get all member profiles (for visitors)
router.get('/public', profileController.getAllPublicProfiles);

module.exports = router;
