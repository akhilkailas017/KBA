const jwt = require('jsonwebtoken');
const dotenv = require('dotenv');

// Load environment variables from .env file
dotenv.config();

module.exports = function(req, res, next) {
  // Get token from the Authorization header
  const token = req.header('Authorization');

  // Check if no token is present
  if (!token) {
    return res.status(401).json({ msg: 'No token, authorization denied' });
  }

  try {
    // Split the token from the "Bearer " prefix
    const decodedToken = token.split(' ')[1];

    // Verify the token
    const decoded = jwt.verify(decodedToken, process.env.JWT_SECRET);

    // Attach the user data to the request object
    req.user = decoded.user;
    next();
  } catch (err) {
    console.error('Token verification error:', err);
    res.status(401).json({ msg: 'Token is not valid' });
  }
};
