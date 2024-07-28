const express = require('express');
const mongoose = require('mongoose');
const path = require('path');
const bodyParser = require('body-parser');
const jwt = require('jsonwebtoken');
const bcrypt = require('bcryptjs');
const cookieParser = require('cookie-parser');
const cors = require('cors');

const app = express();
const port = process.env.PORT || 3000;
// const mongoURI = process.env.MONGO_URI || 'your-mongodb-uri'; // Add your MongoDB URI here
const JWT_SECRET = 'your_jwt_secret'; // Replace with your JWT secret

// Middleware
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));
app.use(cookieParser());
app.use(cors());
app.use(express.static(path.join(__dirname, 'public'))); // Serve static files from 'public'

// MongoDB connection
mongoose.connect('mongodb://localhost:27017/tripmatenew', { useNewUrlParser: true, useUnifiedTopology: true })
    .then(() => console.log('MongoDB connected'))
    .catch(err => console.error('MongoDB connection error:', err));

// User schema and model
const userSchema = new mongoose.Schema({
    name: String,
    username: { type: String, unique: true },
    email: { type: String, unique: true },
    phone: String,
    vehicleName: String,
    vehicleNumber: String,
    password: String
});

const User = mongoose.model('User', userSchema);

// Middleware to authenticate JWT
const authenticateJWT = (req, res, next) => {
    const token = req.cookies.token || req.headers['authorization']?.split(' ')[1];
    if (!token) return res.sendStatus(401);

    jwt.verify(token, JWT_SECRET, (err, user) => {
        if (err) return res.sendStatus(403);
        req.user = user;
        next();
    });
};

// Routes
app.get('/', (req, res) => {
    res.sendFile(path.join(__dirname, 'public', 'index.html'));
});

app.post('/api/signup', async (req, res) => {
    try {
        const { name, username, email, phone, vehicleName, vehicleNumber, password } = req.body;
        const hashedPassword = await bcrypt.hash(password, 10);
        const newUser = new User({ name, username, email, phone, vehicleName, vehicleNumber, password: hashedPassword });
        await newUser.save();
        res.status(201).json({ success: true, message: 'User registered successfully' });
    } catch (err) {
        res.status(400).json({ success: false, message: 'Error registering user', error: err.message });
    }
});

app.post('/api/login', async (req, res) => {
    try {
        const { username, password } = req.body;
        const user = await User.findOne({ username });
        if (!user || !(await bcrypt.compare(password, user.password))) {
            return res.status(401).json({ success: false, message: 'Invalid username or password' });
        }

        const token = jwt.sign({ username: user.username, id: user._id }, JWT_SECRET, { expiresIn: '1h' });
        res.cookie('token', token, { httpOnly: true, secure: false });
        res.json({ success: true, message: 'Login successful' });
    } catch (err) {
        res.status(500).json({ success: false, message: 'Error logging in', error: err.message });
    }
});

app.get('/api/profile', authenticateJWT, async (req, res) => {
    try {
        const user = await User.findById(req.user.id);
        if (!user) return res.status(404).json({ success: false, message: 'User not found' });
        res.json({ success: true, user });
    } catch (err) {
        res.status(500).json({ success: false, message: 'Error fetching user profile', error: err.message });
    }
});

app.post('/api/update-profile', authenticateJWT, async (req, res) => {
    try {
        const { name, email, phone, vehicleName, vehicleNumber } = req.body;
        const user = await User.findByIdAndUpdate(req.user.id, { name, email, phone, vehicleName, vehicleNumber }, { new: true });
        if (!user) return res.status(404).json({ success: false, message: 'User not found' });
        res.json({ success: true, message: 'Profile updated successfully' });
    } catch (err) {
        res.status(500).json({ success: false, message: 'Error updating profile', error: err.message });
    }
});

app.get('/api/logout', (req, res) => {
    res.clearCookie('token');
    res.json({ success: true, message: 'Logged out successfully' });
});

// Static file routes
app.get('/signup', (req, res) => {
    res.sendFile(path.join(__dirname, 'public', 'signup.html'));
});

app.get('/login', (req, res) => {
    res.sendFile(path.join(__dirname, 'public', 'login.html'));
});

app.get('/profile', authenticateJWT, (req, res) => {
    res.sendFile(path.join(__dirname, 'public', 'profile.html'));
});

app.get('/dashboard', authenticateJWT, (req, res) => {
    res.sendFile(path.join(__dirname, 'public', 'dashboard.html'));
});

app.get('/offer', authenticateJWT, (req, res) => {
    res.sendFile(path.join(__dirname, 'public', 'offer.html'));
});

app.listen(port, () => {
    console.log(`Server running on http://localhost:${port}`);
});
