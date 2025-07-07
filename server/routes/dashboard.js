const express = require('express');
const router = express.Router();
const { protect } = require('../middleware/authMiddleware');
const dashboardController = require('../controllers/dashboardController');
const adminController = require('../controllers/adminController');

router.get('/dashboard', protect, dashboardController.getDashboardStats);


module.exports = router;
