const express = require('express');
const Ride = require('../models/Ride');

const router = express.Router();

router.post('/offer-ride', async (req, res) => {
    try {
        const ride = new Ride({ ...req.body, driver: req.userId });
        await ride.save();
        res.json({ success: true });
    } catch (err) {
        res.status(500).json({ success: false, message: err.message });
    }
});

router.get('/search-rides', async (req, res) => {
    try {
        const { departure, arrival, date } = req.query;
        const rides = await Ride.find({ departure, arrival, date });
        res.json(rides);
    } catch (err) {
        res.status(500).json({ success: false, message: err.message });
    }
});

router.post('/book-ride', async (req, res) => {
    try {
        const { rideId, seats } = req.body;
        const ride = await Ride.findById(rideId);
        if (ride.seats < seats) {
            return res.status(400).json({ success: false, message: 'Not enough seats available' });
        }
        ride.seats -= seats;
        await ride.save();
        res.json({ success: true, seats: ride.seats });
    } catch (err) {
        res.status(500).json({ success: false, message: err.message });
    }
});

module.exports = router;
