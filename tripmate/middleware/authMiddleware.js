const jwt = require('jsonwebtoken');
const dotenv = require('dotenv');


dotenv.config();

module.exports = function(req, res, next) {
  
  const token = req.header('Authorization');

  
  if (!token) {
    return res.status(401).json({ msg: 'No token, authorization denied' });
  }

  try {
    
    const decodedToken = token.split(' ')[1];

    
    const decoded = jwt.verify(decodedToken, process.env.JWT_SECRET);

    
    req.user = decoded.user;
    next();
  } catch (err) {
    console.error('Token verification error:', err);
    res.status(401).json({ msg: 'Token is not valid' });
  }
};
