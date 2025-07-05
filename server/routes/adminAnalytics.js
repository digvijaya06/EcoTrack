const express = require('express');
const router = express.Router();
const isAdmin = require('../middleware/isAdmin');
const authenticate = require('../middleware/authMiddleware');
const adminAnalyticsController = require('../controllers/adminAnalyticsController');

// Protect all routes with authentication and isAdmin middleware
router.use(authenticate);
router.use(isAdmin);

// GET environmental impact trends
router.get('/impact', adminAnalyticsController.getImpactTrends);

// GET top performing users/groups
router.get('/top-users', adminAnalyticsController.getTopUsers);

// GET goals/actions count per category with completion rates
router.get('/category-summary', adminAnalyticsController.getCategorySummary);

// Optional: GET export data (CSV/PDF)
if (adminAnalyticsController.exportAnalytics) {
  router.get('/export', adminAnalyticsController.exportAnalytics);
}

// Optional: GET suspicious activity detection
if (adminAnalyticsController.getSuspiciousActivity) {
  router.get('/outliers', adminAnalyticsController.getSuspiciousActivity);
}

module.exports = router;
