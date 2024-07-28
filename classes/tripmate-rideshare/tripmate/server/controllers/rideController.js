const Ride = require('../models/Ride');
const Booking = require('../models/Booking');

exports.offerRide = async (req, res) => {
    try {
        const ride = new Ride({ ...req.body, driver: req.userId });
        await ride.save();
        res.status(201).json({ message: 'Ride offered successfully.' });
    } catch (err) {
        res.status(400).json({ error: err.message });
    }
};

exports.searchRides = async (req, res) => {
    try {
        const { departure, arrival, date } = req.query;
        const rides = await Ride.find({
            departure,
            arrival,
            date: new Date(date),
            isExpired: false
        });
        res.json(rides);
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
};

exports.bookRide = async (req, res) => {
    try {
        const { rideId, seats } = req.body;
        const ride = await Ride.findById(rideId);
        if (!ride || ride.availableSeats < seats) {
            return res.status(400).json({ message: 'Not enough seats available' });
        }
        const booking = new Booking({ ride: rideId, user: req.userId, seatsBooked: seats });
        await booking.save();
        ride.availableSeats -= seats;
        if (ride.availableSeats <= 0) {
            ride.isExpired = true;
        }
        await ride.save();
        res.json({ message: 'Ride booked successfully.' });
    } catch (err) {
        res.status(400).json({ error: err.message });
    }
};

exports.currentBookings = async (req, res) => {
    try {
        const bookings = await Booking.find({ user: req.userId }).populate('ride');
        res.json(bookings);
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
};
