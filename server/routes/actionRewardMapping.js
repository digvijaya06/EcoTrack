const express = require('express');
const router = express.Router();
const actionRewardMappingController = require('../controllers/actionRewardMappingController');

// Public route to get all action-reward mappings
router.get('/', actionRewardMappingController.getAllMappings);

module.exports = router;
