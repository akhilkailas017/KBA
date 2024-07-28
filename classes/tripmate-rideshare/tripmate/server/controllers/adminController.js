const User = require('../models/User');

exports.login = async (req, res) => {
    // Similar to user login with additional checks for admin role
};

exports.getVerificationRequests = async (req, res) => {
    try {
        const users = await User.find({ isVerified: false });
        res.json(users);
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
};

exports.verifyUser = async (req, res) => {
    try {
        const { userId } = req.params;
        const user = await User.findById(userId);
        if (!user) return res.status(404).json({ message: 'User not found' });
        user.isVerified = true;
        await user.save();
        res.json({ message: 'User verified successfully.' });
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
};
