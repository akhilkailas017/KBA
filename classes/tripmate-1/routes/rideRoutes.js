const express = require('express');
const { offerRide, searchRides } = require('../controllers/rideController');
const { protect } = require('../middlewares/authMiddleware');
const router = express.Router();

router.post('/offer-ride', protect, offerRide);
router.get('/search-rides', searchRides);

module.exports = router;
