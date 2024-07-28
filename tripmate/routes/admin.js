// routes/admin.js

const express = require('express');
const { adminLogin , adminSignup } = require('../controllers/adminController');
const adminAuthMiddleware = require('../middleware/adminAuthMiddleware');

const router = express.Router();

// Admin login route
router.post('/login', adminLogin);
router.post('/signup', adminSignup);

// Example of a protected admin route
router.get('/dashboard', adminAuthMiddleware, (req, res) => {
  res.send('Admin Dashboard');
});

module.exports = router;
