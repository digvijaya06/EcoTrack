const express = require('express');
const router = express.Router();
const authMiddleware = require('../middleware/authMiddleware');
const actionController = require('../controllers/actionController');

// All routes require user authentication
router.use(authMiddleware);

router.get('/', actionController.getActions);
router.get('/:id', actionController.getActionById);
router.post('/', actionController.createAction);
router.put('/:id', actionController.updateAction);
router.delete('/:id', actionController.deleteAction);
router.get('/meta/dropdowns', actionController.getActionMeta);

module.exports = router;
