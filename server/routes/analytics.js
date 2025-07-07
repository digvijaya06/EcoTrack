const express = require('express');
const router = express.Router();
const { protect } = require('../middleware/authMiddleware');
const analyticsController = require('../controllers/analyticsController');

router.get('/kpis', protect, analyticsController.getKPIs);
router.get('/monthly-impact', protect, analyticsController.getMonthlyImpact);



// Added routes to match frontend API calls
router.get('/overall-kpis', (req, res) => res.send('OK'));
router.get('/overall-monthly-impact', analyticsController.getOverallMonthlyImpact);
router.get('/weekly-activity', analyticsController.getWeeklyActivity);
router.get('/action-categories', analyticsController.getActionCategories);
router.get('/impact-data', analyticsController.getImpactData);
router.get('/achievements', analyticsController.getAchievements);

// New routes for required analytics API
router.get('/summary', analyticsController.getSummary);
router.get('/actions', analyticsController.getActionCategories);
router.get('/goals', analyticsController.getGoalsAnalytics);
// router.get('/questions', analyticsController.getAggregatedUserQuestionResponses);

router.post('/user-question-response', protect, analyticsController.saveUserQuestionResponse);
router.post('/user-question-response/batch', protect, analyticsController.saveUserQuestionResponsesBatch);
router.get('/user-question-response/aggregated', analyticsController.getAggregatedUserQuestionResponses);

module.exports = router;



