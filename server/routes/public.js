const express = require('express');
const router = express.Router();

const resourceController = require('../controllers/resourceController');
const eventController = require('../controllers/eventController');

// Public route to get all resources
router.get('/resources', resourceController.getResourcesPublic);

// Public route to get all events
router.get('/events', eventController.getEventsPublic);

module.exports = router;
