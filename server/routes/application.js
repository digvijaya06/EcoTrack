const express = require('express');
const router = express.Router();
const { sendApplication } = require('../controllers/applicationController');

router.post('/apply', sendApplication);

module.exports = router;
