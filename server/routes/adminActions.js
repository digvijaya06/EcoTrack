const express = require('express');
const router = express.Router();
const { getAllActions, approveAction, rejectAction } = require('../controllers/adminActionsController');
const { protect } = require('../middleware/authMiddleware');
const isAdmin = require('../middleware/isAdmin');

// GET all user actions (for admin)
router.get('/', protect, isAdmin, getAllActions);

// PUT approve a specific action
router.put('/:id/approve', protect, isAdmin, approveAction);

// PUT reject a specific action
router.put('/:id/reject', protect, isAdmin, rejectAction);

module.exports = router;
