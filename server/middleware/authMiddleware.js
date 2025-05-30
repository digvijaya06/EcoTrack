const jwt = require('jsonwebtoken');
const User = require('../models/User');

const protect = async (req, res, next) => {
  try {
    const token = req.header('Authorization')?.replace('Bearer ', '');

    if (!token) {
      return res.status(401).json({ message: 'No token, authorization denied' });
    }

    const decoded = jwt.verify(token, process.env.JWT_SECRET);

    req.user = await User.findById(decoded.id).select('-password'); // exclude password
    if (!req.user) {
      return res.status(401).json({ message: 'User not found, authorization denied' });
    }
    next();

  } catch (error) {
    console.error('Auth Middleware Error:', error);
    res.status(401).json({ message: 'Token is not valid' });
  }
};

module.exports = protect;
