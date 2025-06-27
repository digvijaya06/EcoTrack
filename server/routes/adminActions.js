const express = require('express');
const router = express.Router();
const { getAllActions, approveAction, rejectAction } = require('../controllers/adminActionsController');
const authenticate = require('../middleware/authMiddleware');
const isAdmin = require('../middleware/isAdmin');

// GET all user actions (for admin)
router.get('/', authenticate, isAdmin, getAllActions);

// PUT approve a specific action
router.put('/:id/approve', authenticate, isAdmin, approveAction);

// PUT reject a specific action
router.put('/:id/reject', authenticate, isAdmin, rejectAction);

module.exports = router;
