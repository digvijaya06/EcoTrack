const express = require('express');
const router = express.Router();
const auth = require('../middleware/authMiddleware');
const dashboardController = require('../controllers/dashboardController');
const adminController = require('../controllers/adminController');

router.get('/dashboard', auth, dashboardController.getDashboardStats);


module.exports = router;
