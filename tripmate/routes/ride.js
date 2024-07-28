const express = require('express');
const { offerRide, searchRides, bookRide } = require('../controllers/rideController');
const authMiddleware = require('../middleware/authMiddleware'); // Middleware for authentication

const router = express.Router();

router.post('/offer', authMiddleware, offerRide);
router.get('/search', authMiddleware, searchRides);
router.post('/book', authMiddleware, bookRide);

module.exports = router;
