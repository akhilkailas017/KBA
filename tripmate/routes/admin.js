
const express = require('express');
const { adminLogin , adminSignup } = require('../controllers/adminController');
const adminAuthMiddleware = require('../middleware/adminAuthMiddleware');

const router = express.Router();


router.post('/login', adminLogin);
router.post('/signup', adminSignup);


router.get('/dashboard', adminAuthMiddleware, (req, res) => {
  res.send('Admin Dashboard');
});

module.exports = router;
