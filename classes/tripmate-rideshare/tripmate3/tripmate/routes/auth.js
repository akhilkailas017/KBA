const express = require('express');
const jwt = require('jsonwebtoken');
const User = require('../models/User');
const bcrypt = require('bcrypt');

const router = express.Router();

router.post('/register', async (req, res) => {
    try {
        const { name, username, email, phone, password, vehicleName, vehicleNumber } = req.body;
        const hashedPassword = await bcrypt.hash(password, 10);
        const user = new User({ name, username, email, phone, password: hashedPassword, vehicleName, vehicleNumber });
        await user.save();
        res.json({ success: true });
    } catch (err) {
        res.status(400).json({ success: false, message: err.message });
    }
});

router.post('/login', async (req, res) => {
    try {
        const { username, password } = req.body;
        const user = await User.findOne({ username });
        if (!user || !(await bcrypt.compare(password, user.password))) {
            return res.status(400).json({ success: false, message: 'Invalid credentials' });
        }
        const token = jwt.sign({ userId: user._id }, 'your_jwt_secret', { expiresIn: '1h' });
        res.json({ success: true, message: 'Login successful', token });
    } catch (err) {
        res.status(500).json({ success: false, message: err.message });
    }
});



module.exports = router;
