const jwt = require('jsonwebtoken');

exports.generateToken = (userId) => {
    return jwt.sign({ id: userId }, 'your_jwt_secret', { expiresIn: '1h' });
};
