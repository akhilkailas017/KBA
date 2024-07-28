const express = require('express');
const router = express.Router();
const adminController = require('../controllers/adminController');
const authMiddleware = require('../utils/authMiddleware');

router.post('/login', adminController.login);
router.get('/verify', authMiddleware.verifyToken, adminController.getVerificationRequests);
router.post('/verify/:userId', authMiddleware.verifyToken, adminController.verifyUser);

module.exports = router;
