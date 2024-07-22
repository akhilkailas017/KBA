const mongoose = require('mongoose');

const RideSchema = new mongoose.Schema({
    user: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User',
    },
    source: {
        type: String,
        required: true,
    },
    destination: {
        type: String,
        required: true,
    },
    vehicle: {
        type: String,
        required: true,
    },
    vehicleNumber: {
        type: String,
        required: true,
    },
    date: {
        type: Date,
        required: true,
    },
    time: {
        type: String,
        required: true,
    },
    seats: {
        type: Number,
        required: true,
    },
    seatsAvailable: {
        type: Number,
        required: true,
    },
});

module.exports = mongoose.model('Ride', RideSchema);
