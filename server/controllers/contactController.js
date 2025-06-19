const sendContactMessage = async (req, res) => {
  try {
    const { name, email, message } = req.body;

    if (!name || !email || !message) {
      return res.status(400).json({ error: 'Please provide name, email, and message.' });
    }

    console.log('Contact message received:', { name, email, message });

    // Here you can add logic to save the message to DB or send email notification

    res.status(200).json({ message: 'Contact message received successfully.' });
  } catch (error) {
    console.error('Error in sendContactMessage:', error);
    res.status(500).json({ error: 'Failed to send contact message.' });
  }
};

module.exports = {
  sendContactMessage,
};
