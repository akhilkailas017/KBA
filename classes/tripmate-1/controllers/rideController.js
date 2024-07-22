const Ride = require('../models/Ride');

exports.offerRide = async (req, res) => {
    const { source, destination, vehicle, vehicleNumber, date, time, seats } = req.body;
    try {
        const ride = await Ride.create({
            user: req.user.id,
            source,
            destination,
            vehicle,
            vehicleNumber,
            date,
            time,
            seats,
            seatsAvailable: seats,
        });
        res.status(201).json(ride);
    } catch (error) {
        res.status(400).json({ error: error.message });
    }
};

exports.searchRides = async (req, res) => {
    const { source, destination, date } = req.query;
    try {
        const rides = await Ride.find({ source, destination, date });
        res.json(rides);
    } catch (error) {
        res.status(400).json({ error: error.message });
    }
};
