const express = require('express');
const router = express.Router();
const rideController = require('../controllers/rideController');
const authMiddleware = require('../utils/authMiddleware');

router.post('/offer', authMiddleware.verifyToken, rideController.offerRide);
router.get('/search', rideController.searchRides);
router.post('/book', authMiddleware.verifyToken, rideController.bookRide);
router.get('/current', authMiddleware.verifyToken, rideController.currentBookings);

module.exports = router;
