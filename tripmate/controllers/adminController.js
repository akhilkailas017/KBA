
const Admin = require('../models/Admin');
const jwt = require('jsonwebtoken');
const bcrypt = require('bcrypt');
const dotenv = require('dotenv');

dotenv.config();

const adminLogin = async (req, res) => {
    const { username, password } = req.body;

    try {

        const admin = await Admin.findOne({ username });


        if (!admin) {
            return res.status(400).json({ msg: 'Invalid credentials' });
        }


        const isMatch = await bcrypt.compare(password, admin.password);
        if (!isMatch) {
            return res.status(400).json({ msg: 'Invalid credentials' });
        }


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

        let admin = await Admin.findOne({ username });
        if (admin) {
            return res.status(400).json({ msg: 'Admin already exists' });
        }


        admin = new Admin({ username, password });
        await admin.save();


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
