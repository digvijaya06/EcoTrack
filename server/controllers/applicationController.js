const Application = require('../models/Application');

const sendApplication = async (req, res) => {
  try {
    const { name, email, message, role } = req.body;

    if (!name || !email || !message || !role) {
      return res.status(400).json({ error: 'Please provide name, email, message, and role.' });
    }

    const newApplication = new Application({
      name,
      email,
      message,
      role,
    });

    await newApplication.save();

    console.log('Application saved:', newApplication);

    res.status(200).json({ message: 'Application received successfully' });
  } catch (error) {
    console.error('Error processing application:', error);
    res.status(500).json({ message: 'Server error' });
  }
};

const getApplications = async (req, res) => {
  try {
    const applications = await Application.find().sort({ createdAt: -1 });
    res.status(200).json(applications);
  } catch (error) {
    console.error('Error fetching applications:', error);
    res.status(500).json({ error: 'Failed to fetch applications.' });
  }
};

module.exports = { sendApplication, getApplications };
