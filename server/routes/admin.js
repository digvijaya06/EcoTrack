const express = require('express');
const router = express.Router();
const auth = require('../middleware/authMiddleware');
const isAdmin = require('../middleware/isAdmin');
const adminController = require('../controllers/adminController');

router.get('/stats', auth, isAdmin, adminController.getStats);

router.get('/users', auth, isAdmin, adminController.getUsers);
router.put('/users/:id', auth, isAdmin, adminController.updateUser);
router.delete('/users/:id', auth, isAdmin, adminController.deleteUser);

module.exports = router;
