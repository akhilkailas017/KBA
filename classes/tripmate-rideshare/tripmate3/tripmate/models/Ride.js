const mongoose = require('mongoose');

const rideSchema = new mongoose.Schema({
    departure: String,
    arrival: String,
    route: String,
    stops: String,
    date: String,
    time: String,
    capacity: Number,
    seats: { type: Number, default: function() { return this.capacity; } },
    driver: { type: mongoose.Schema.Types.ObjectId, ref: 'User' }
});

module.exports = mongoose.model('Ride', rideSchema);
