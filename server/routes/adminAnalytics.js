const express = require('express');
const router = express.Router();
const isAdmin = require('../middleware/isAdmin');
const adminAnalyticsController = require('../controllers/adminAnalyticsController');
const authenticate = require('../middleware/authMiddleware');

// Protect all routes with authentication and isAdmin middleware
router.use(authenticate);
router.use(isAdmin);

// GET environmental impact trends
router.get('/impact', adminAnalyticsController.getImpactTrends);

// GET top performing users/groups
router.get('/top-users', adminAnalyticsController.getTopUsers);

// GET goals/actions count per category with completion rates
router.get('/category-summary', adminAnalyticsController.getCategorySummary);

// GET export data (CSV/PDF) - optional stub
router.get('/export', adminAnalyticsController.exportAnalytics);

// GET suspicious activity detection - optional stub
router.get('/outliers', adminAnalyticsController.getSuspiciousActivity);

module.exports = router;
