const express = require('express');
const mongoose = require('mongoose');
const bodyParser = require('body-parser');
const jwt = require('jsonwebtoken');
const bcrypt = require('bcryptjs');
const cors = require('cors');
const dotenv = require('dotenv');
const path = require('path');
const fs = require('fs');

dotenv.config();

const app = express();
const port = process.env.PORT || 3000;

// Middleware
app.use(cors());
app.use(bodyParser.json());
app.use(express.static(path.join(__dirname, 'public')));

// MongoDB Connection
mongoose.connect(process.env.MONGO_URI, {
    useNewUrlParser: true,
    useUnifiedTopology: true
});
const db = mongoose.connection;
db.on('error', console.error.bind(console, 'connection error:'));
db.once('open', () => console.log('Connected to MongoDB'));

// User Schema
const userSchema = new mongoose.Schema({
    username: { type: String, unique: true },
    password: String,
    fullName: String,
    gender: String,
    age: Number,
    email: String,
    phoneNumber: String,
    vehicle: {
        name: String,
        numberPlate: String
    },
    isVerified: { type: Boolean, default: false }
});
const User = mongoose.model('User', userSchema);

// Ride Schema
const rideSchema = new mongoose.Schema({
    departure: String,
    arrival: String,
    route: String,
    stops: String,
    date: Date,
    time: String,
    capacity: Number,
    availableSeats: Number,
    bookedSeats: { type: Number, default: 0 },
    offeredBy: { type: mongoose.Schema.Types.ObjectId, ref: 'User' }
});
const Ride = mongoose.model('Ride', rideSchema);

// Authentication Middleware
const authenticateToken = (req, res, next) => {
    const token = req.headers['authorization']?.split(' ')[1];
    if (token == null) return res.sendStatus(401);

    jwt.verify(token, process.env.JWT_SECRET, (err, user) => {
        if (err) return res.sendStatus(403);
        req.user = user;
        next();
    });
};

// Routes

app.get('/', (req, res) => {
    res.sendFile(path.join(__dirname, 'public', 'index.html'));
});

app.get('/login', (req, res) => {
    res.sendFile(path.join(__dirname, 'public', 'login.html'));
});

app.get('/signup', (req, res) => {
    res.sendFile(path.join(__dirname, 'public', 'signup.html'));
});

// Sign Up
app.post('/signup', async (req, res) => {
    try {
        const { username, password, fullName, gender, age, email, phoneNumber, vehicle } = req.body;
        const hashedPassword = await bcrypt.hash(password, 10);
        const newUser = new User({ username, password: hashedPassword, fullName, gender, age, email, phoneNumber, vehicle });
        await newUser.save();
        res.status(201).send('User registered successfully');
    } catch (error) {
        res.status(400).send('Error registering user');
    }
});

// Login
app.post('/login', async (req, res) => {
    const { username, password } = req.body;
    const user = await User.findOne({ username });
    if (!user || !(await bcrypt.compare(password, user.password))) {
        return res.status(400).send('Invalid credentials');
    }
    if (!user.isVerified) {
        return res.status(403).send('User not verified');
    }
    const token = jwt.sign({ id: user._id }, process.env.JWT_SECRET, { expiresIn: '1h' });
    res.json({ token });
});

// Offer Ride
app.post('/offer-ride', authenticateToken, async (req, res) => {
    try {
        const { departure, arrival, route, stops, date, time, capacity } = req.body;
        const ride = new Ride({
            departure,
            arrival,
            route,
            stops,
            date,
            time,
            capacity,
            availableSeats: capacity,
            offeredBy: req.user.id
        });
        await ride.save();
        res.status(201).send('Ride offered successfully');
    } catch (error) {
        res.status(400).send('Error offering ride');
    }
});

// Search Rides
app.get('/search-rides', async (req, res) => {
    const { departure, arrival, date } = req.query;
    const rides = await Ride.find({
        departure,
        arrival,
        date: new Date(date),
        availableSeats: { $gt: 0 }
    }).populate('offeredBy');
    res.json(rides);
});

// Book Ride
app.post('/book-ride/:id', authenticateToken, async (req, res) => {
    try {
        const ride = await Ride.findById(req.params.id);
        if (!ride || ride.availableSeats <= 0) return res.status(404).send('Ride not available');

        const { seats } = req.body;
        if (seats > ride.availableSeats) return res.status(400).send('Not enough seats available');

        ride.bookedSeats += seats;
        ride.availableSeats -= seats;

        if (ride.availableSeats === 0) {
            await ride.remove(); // Remove ride from the list if no seats are available
        } else {
            await ride.save();
        }

        res.send('Ride booked successfully');
    } catch (error) {
        res.status(400).send('Error booking ride');
    }
});

// Admin Login
app.post('/admin-login', async (req, res) => {
    const { username, password } = req.body;
    // Admin login logic should be implemented here
    res.send('Admin login not implemented');
});

// Admin Verification
app.get('/admin-verify', async (req, res) => {
    const users = await User.find({ isVerified: false });
    res.json(users);
});

// Verify User
app.post('/verify-user/:id', async (req, res) => {
    try {
        await User.findByIdAndUpdate(req.params.id, { isVerified: true });
        res.send('User verified successfully');
    } catch (error) {
        res.status(400).send('Error verifying user');
    }
});

// Reject User
app.post('/reject-user/:id', async (req, res) => {
    try {
        await User.findByIdAndRemove(req.params.id);
        res.send('User rejected successfully');
    } catch (error) {
        res.status(400).send('Error rejecting user');
    }
});

// Ride Details
app.get('/ride-details', async (req, res) => {
    const rides = await Ride.find({ date: { $gte: new Date() } });
    res.json(rides);
});

// Serve HTML files
app.get('*', (req, res) => {
    const filePath = path.join(__dirname, 'public', req.path === '/' ? 'index.html' : req.path);
    if (fs.existsSync(filePath)) {
        res.sendFile(filePath);
    } else {
        res.status(404).send('File not found');
    }
});

app.listen(port, () => {
    console.log(`Server running on port ${port}`);
});
