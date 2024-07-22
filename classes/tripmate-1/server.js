const express = require('express');
const connectDB = require('./config/db');
const authRoutes = require('./routes/authRoutes');
const rideRoutes = require('./routes/rideRoutes');
const userRoutes = require('./routes/userRoutes');

const app = express();

// Connect to MongoDB
connectDB();

// Middleware
app.use(express.json());
app.use(express.static('public'));

// Routes
app.use('/api/auth', authRoutes);
app.use('/api/rides', rideRoutes);
app.use('/api/users', userRoutes);

// Serve HTML files
app.get('/', (req, res) => res.sendFile(__dirname + '/views/index.html'));
app.get('/login', (req, res) => res.sendFile(__dirname + '/views/login.html'));
app.get('/signup', (req, res) => res.sendFile(__dirname + '/views/signup.html'));
app.get('/dashboard', (req, res) => res.sendFile(__dirname + '/views/dashboard.html'));
app.get('/offer-ride', (req, res) => res.sendFile(__dirname + '/views/offer-ride.html'));
app.get('/profile', (req, res) => res.sendFile(__dirname + '/views/profile.html'));
app.get('/admin-login', (req, res) => res.sendFile(__dirname + '/views/admin-login.html'));
app.get('/admin-verification', (req, res) => res.sendFile(__dirname + '/views/admin-verification.html'));

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
