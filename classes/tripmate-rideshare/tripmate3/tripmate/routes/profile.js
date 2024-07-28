const express = require('express');
const User = require('../models/User');

const router = express.Router();

router.get('/', async (req, res) => {
    try {
        const user = await User.findById(req.userId);
        res.json(user);
    } catch (err) {
        res.status(500).json({ success: false, message: err.message });
    }
});

router.put('/', async (req, res) => {
    try {
        const { name, username, email, phone, vehicleName, vehicleNumber } = req.body;
        const user = await User.findByIdAndUpdate(req.userId, { name, username, email, phone, vehicleName, vehicleNumber }, { new: true });
        res.json({ success: true });
    } catch (err) {
        res.status(500).json({ success: false, message: err.message });
    }
});


router.get('/profile', async (req, res) => {
    try {
        const user = await User.findById(req.userId);
        if (!user) {
            return res.status(404).json({ success: false, message: 'User not found' });
        }
        res.json(user);
    } catch (err) {
        res.status(500).json({ success: false, message: err.message });
    }
});

module.exports = router;
