const express = require('express');
const router = express.Router();
const resourceController = require('../controllers/resourceController');
const { protect, admin } = require('../middleware/authMiddleware');

// Public route to get all resources
router.get('/', resourceController.getResourcesPublic);

// Admin routes for resource management
router.post('/', protect, admin, resourceController.createResource);
router.put('/:id', protect, admin, resourceController.updateResource);
router.delete('/:id', protect, admin, resourceController.deleteResource);

module.exports = router;
