const express = require('express');
const router = express.Router();
const challengeController = require('../controllers/challengeController');
const challengeParticipationController = require('../controllers/challengeParticipationController');
const isAdmin = require('../middleware/isAdmin');

// Public route to get all challenges
router.get('/', challengeController.getAllChallenges);

// Admin routes for managing challenges
router.post('/', isAdmin, challengeController.createChallenge);

// Route for user to join a challenge
router.post('/join', challengeParticipationController.joinChallenge);

const protect = require('../middleware/authMiddleware');


// New route to get approved participations for logged-in user
router.get('/approvedParticipations', protect, challengeParticipationController.getApprovedParticipationsForUser);

// New route to get joined or approved participations for logged-in user
router.get('/joinedOrApprovedParticipations', protect, challengeParticipationController.getJoinedOrApprovedParticipationsForUser);

router.get('/:id', challengeController.getChallengeById);
router.put('/:id', isAdmin, challengeController.updateChallenge);
router.delete('/:id', isAdmin, challengeController.deleteChallenge);

module.exports = router;
