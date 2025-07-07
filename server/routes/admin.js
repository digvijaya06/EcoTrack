const express = require('express');
const router = express.Router();
const { protect, admin } = require('../middleware/authMiddleware');
const adminController = require('../controllers/adminController');

router.get('/stats', protect, admin, adminController.getStats);

router.get('/users', protect, admin, adminController.getUsers);
router.put('/users/:id', protect, admin, adminController.updateUser);
router.delete('/users/:id', protect, admin, adminController.deleteUser);

// Contact submissions routes
router.get('/contact-submissions', protect, admin, adminController.getContactSubmissions);
router.put('/contact-submissions/:id/status', protect, admin, adminController.updateContactSubmissionStatus);

module.exports = router;
