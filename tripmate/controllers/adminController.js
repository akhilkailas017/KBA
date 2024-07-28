// controllers/adminController.js

const Admin = require('../models/Admin');
const jwt = require('jsonwebtoken');
const bcrypt = require('bcrypt');
const dotenv = require('dotenv');

dotenv.config();

const adminLogin = async (req, res) => {
    const { username, password } = req.body;

    try {
        // Find the admin by username
        const admin = await Admin.findOne({ username });

        // Check if admin exists
        if (!admin) {
            return res.status(400).json({ msg: 'Invalid credentials' });
        }

        // Check if the password matches
        const isMatch = await bcrypt.compare(password, admin.password);
        if (!isMatch) {
            return res.status(400).json({ msg: 'Invalid credentials' });
        }

        // Create a payload and generate a JWT token
        const payload = { admin: { id: admin.id, username: admin.username } };
        jwt.sign(payload, process.env.JWT_SECRET, { expiresIn: '5h' }, (err, token) => {
            if (err) throw err;
            res.json({ token });
        });
    } catch (err) {
        console.error(err.message);
        res.status(500).send('Server error');
    }
};

const adminSignup = async (req, res) => {
    const { username, password } = req.body;

    try {
        // Check if admin with this username already exists
        let admin = await Admin.findOne({ username });
        if (admin) {
            return res.status(400).json({ msg: 'Admin already exists' });
        }

        // Create a new admin
        admin = new Admin({ username, password });
        await admin.save();

        // Create a JWT token
        const payload = { admin: { id: admin.id, username: admin.username } };
        jwt.sign(payload, process.env.JWT_SECRET, { expiresIn: '5h' }, (err, token) => {
            if (err) throw err;
            res.json({ token });
        });
    } catch (err) {
        console.error(err.message);
        res.status(500).send('Server error');
    }
};

module.exports = { adminLogin, adminSignup };
