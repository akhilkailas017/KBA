const jwt = require('jsonwebtoken');
const dotenv = require('dotenv');

dotenv.config();

module.exports = function (req, res, next) {
  
  const token = req.header('Authorization');

  
  if (!token) {
    return res.status(401).json({ msg: 'No token, authorization denied' });
  }

  
  try {
    const decodedToken = token.split(' ')[1];
    const decoded = jwt.verify(decodedToken, process.env.JWT_SECRET);

    req.admin = decoded.admin;
    next();
  } catch (err) {
    res.status(401).json({ msg: 'Token is not valid' });
  }
};
