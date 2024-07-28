const mongoose = require('mongoose');

const userSchema = new mongoose.Schema({
    name: String,
    username: { type: String, unique: true },
    email: { type: String, unique: true },
    phone: String,
    password: String,
    vehicleName: String,
    vehicleNumber: String
});

module.exports = mongoose.model('User', userSchema);
