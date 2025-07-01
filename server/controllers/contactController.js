const ContactSubmission = require('../models/ContactSubmission');

const sendContactMessage = async (req, res) => {
  try {
    const { name, email, message } = req.body;

    if (!name || !email || !message) {
      return res.status(400).json({ error: 'Please provide name, email, and message.' });
    }

    const newSubmission = new ContactSubmission({
      name,
      email,
      message,
      status: 'Pending',
    });

    await newSubmission.save();

    console.log('Contact message saved:', newSubmission);

    res.status(200).json({ message: 'Contact message received successfully.' });
  } catch (error) {
    console.error('Error in sendContactMessage:', error);
    res.status(500).json({ error: 'Failed to send contact message.' });
  }
};

const getContactSubmissions = async (req, res) => {
  try {
    const submissions = await ContactSubmission.find().sort({ createdAt: -1 });
    res.status(200).json(submissions);
  } catch (error) {
    console.error('Error in getContactSubmissions:', error);
    res.status(500).json({ error: 'Failed to fetch contact submissions.' });
  }
};

const updateContactSubmissionStatus = async (req, res) => {
  try {
    const { id } = req.params;
    const { status } = req.body;

    if (!['Pending', 'Resolved'].includes(status)) {
      return res.status(400).json({ error: 'Invalid status value.' });
    }

    const submission = await ContactSubmission.findById(id);
    if (!submission) {
      return res.status(404).json({ error: 'Contact submission not found.' });
    }

    submission.status = status;
    await submission.save();

    res.status(200).json({ message: 'Status updated successfully.' });
  } catch (error) {
    console.error('Error in updateContactSubmissionStatus:', error);
    res.status(500).json({ error: 'Failed to update contact submission status.' });
  }
};

const deleteContactSubmission = async (req, res) => {
  try {
    const { id } = req.params;
    const submission = await ContactSubmission.findById(id);
    if (!submission) {
      return res.status(404).json({ error: 'Contact submission not found.' });
    }
    await ContactSubmission.findByIdAndDelete(id);
    res.status(200).json({ message: 'Contact submission deleted successfully.' });
  } catch (error) {
    console.error('Error in deleteContactSubmission:', error);
    res.status(500).json({ error: 'Failed to delete contact submission.' });
  }
};

module.exports = {
  sendContactMessage,
  getContactSubmissions,
  updateContactSubmissionStatus,
  deleteContactSubmission,
};
