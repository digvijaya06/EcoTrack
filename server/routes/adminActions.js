const express = require('express');
const router = express.Router();
const { protect, admin } = require('../middleware/authMiddleware');
const adminActionsController = require('../controllers/adminActionsController');

// GET all admin actions
router.get('/', protect, admin, adminActionsController.getAllActions);

// Approve an action
router.put('/:id/approve', protect, admin, adminActionsController.approveAction);

// Reject an action
router.put('/:id/reject', protect, admin, adminActionsController.rejectAction);

// Add user eligibility for rewards (admin only)
router.post('/add-user-eligibility', protect, admin, adminActionsController.addUserEligibility);

module.exports = router;
