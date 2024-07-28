const mongoose = require('mongoose');

const bookingSchema = new mongoose.Schema({
    ride: { type: mongoose.Schema.Types.ObjectId, ref: 'Ride' },
    user: { type: mongoose.Schema.Types.ObjectId, ref: 'User' },
    seatsBooked: Number
});

module.exports = mongoose.model('Booking', bookingSchema);
