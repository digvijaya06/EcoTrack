const express = require('express');
const router = express.Router();
const protect = require('../middleware/authMiddleware');
const { getKPIs, getMonthlyImpact } = require('../controllers/analyticsController');

router.get('/kpis', protect, getKPIs);
router.get('/monthly-impact', protect, getMonthlyImpact);

module.exports = router;
