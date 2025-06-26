const express = require('express');
const router = express.Router();
const auth = require('../middleware/authMiddleware');
const dashboardController = require('../controllers/dashboardController');
const adminController = require('../controllers/adminController');

router.get('/dashboard', auth, dashboardController.getDashboardStats);
// Fix: adminController.getAdminDashboardStats might be undefined or missing, comment out or fix
// router.get('/admin/dashboard', auth, adminController.getAdminDashboardStats);

module.exports = router;
