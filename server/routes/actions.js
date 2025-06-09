const express = require('express');
const router = express.Router();
const { protect } = require('../middleware/authMiddleware');
const {
  getActions,
  getActionById,
  createAction,
  updateAction,
  deleteAction,
  getActionMeta,
  getStatsByCategory,
  getStatsWeekly
} = require('../controllers/actionController');

router.get('/', protect, getActions);
router.get('/:id', protect, getActionById);
router.post('/', protect, createAction);
router.put('/:id', protect, updateAction);
router.delete('/:id', protect, deleteAction);
router.get('/meta', protect, getActionMeta);

// Stats routes
router.get('/stats/categories', protect, getStatsByCategory);
router.get('/stats/weekly', protect, getStatsWeekly);

module.exports = router;
