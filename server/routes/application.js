const express = require('express');
const router = express.Router();
const { sendApplication, getApplications } = require('../controllers/applicationController');

router.post('/apply', sendApplication);
router.get('/', getApplications);

module.exports = router;
