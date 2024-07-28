const mongoose = require('mongoose');

const rideSchema = new mongoose.Schema({
    departure: String,
    arrival: String,
    route: String,
    stops: String,
    date: Date,
    time: String,
    capacity: Number,
    availableSeats: Number,
    driver: { type: mongoose.Schema.Types.ObjectId, ref: 'User' },
    isExpired: { type: Boolean, default: false }
});

module.exports = mongoose.model('Ride', rideSchema);
