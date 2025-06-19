const sendApplication = async (req, res) => {
  try {
    const { name, email, message, role } = req.body;

    // TODO: Implement saving to database or sending email logic here
    console.log('Received application:', { name, email, message, role });

    // For now, just respond with success
    res.status(200).json({ message: 'Application received successfully' });
  } catch (error) {
    console.error('Error processing application:', error);
    res.status(500).json({ message: 'Server error' });
  }
};

module.exports = { sendApplication };
