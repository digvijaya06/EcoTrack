const express = require('express');
const router = express.Router();
const adminChallengeParticipationController = require('../controllers/adminChallengeParticipationController');
const authenticate = require('../middleware/authMiddleware');
const isAdmin = require('../middleware/isAdmin');

// GET all challenge participations (for admin)
router.get('/', authenticate, isAdmin, adminChallengeParticipationController.getAllParticipations);

// PUT approve a challenge participation
router.put('/:id/approve', authenticate, isAdmin, adminChallengeParticipationController.approveParticipation);

// PUT reject a challenge participation
router.put('/:id/reject', authenticate, isAdmin, adminChallengeParticipationController.rejectParticipation);

module.exports = router;
