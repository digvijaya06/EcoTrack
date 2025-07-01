const express = require('express');
const router = express.Router();
const { sendContactMessage, getContactSubmissions, updateContactSubmissionStatus } = require('../controllers/contactController');

router.post('/', sendContactMessage);
router.get('/', getContactSubmissions);
router.put('/:id/status', updateContactSubmissionStatus);

const { deleteContactSubmission } = require('../controllers/contactController');

router.delete('/:id', deleteContactSubmission);

module.exports = router;
