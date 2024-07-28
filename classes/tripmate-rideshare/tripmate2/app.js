require('dotenv').config();
const express = require('express');
const mongoose = require('mongoose');
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const path = require('path');

const app = express();
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

mongoose.connect(process.env.MONGO_URI, { useNewUrlParser: true, useUnifiedTopology: true })
    .then(() => console.log('Connected to MongoDB...'))
    .catch(err => console.error('Could not connect to MongoDB...', err));

const User = mongoose.model('User', new mongoose.Schema({
    username: String,
    fullName: String,
    gender: String,
    age: Number,
    email: String,
    phone: String,
    vehicleName: String,
    numberPlate: String,
    password: String
}));

// Middleware to authenticate JWT token
const authenticate = async (req, res, next) => {
    const token = req.header('Authorization').replace('Bearer ', '');
    if (!token) return res.status(401).send('Access denied. No token provided.');

    try {
        const decoded = jwt.verify(token, process.env.JWT_SECRET);
        req.user = decoded;
        next();
    } catch (ex) {
        res.status(400).send('Invalid token.');
    }
};

// Serve static files
app.use(express.static(path.join(__dirname, 'public')));

// Signup endpoint
app.post('/api/signup', async (req, res) => {
    const { username, fullName, gender, age, email, phone, vehicleName, numberPlate, password } = req.body;
    const existingUser = await User.findOne({ username });
    if (existingUser) return res.status(400).send('User already exists.');

    const user = new User({ username, fullName, gender, age, email, phone, vehicleName, numberPlate, password });
    const salt = await bcrypt.genSalt(10);
    user.password = await bcrypt.hash(user.password, salt);
    await user.save();

    const token = jwt.sign({ _id: user._id, username: user.username }, process.env.JWT_SECRET, { expiresIn: '1h' });
    res.send(token);
});

// Login endpoint
app.post('/api/login', async (req, res) => {
    const { username, password } = req.body;
    const user = await User.findOne({ username });
    if (!user) return res.status(400).send('Invalid username or password.');

    const isValidPassword = await bcrypt.compare(password, user.password);
    if (!isValidPassword) return res.status(400).send('Invalid username or password.');

    const token = jwt.sign({ _id: user._id, username: user.username }, process.env.JWT_SECRET, { expiresIn: '1h' });
    res.redirect('/dashboard'); // Redirect to dashboard page after successful login
});

app.get('/dashboard', (req, res) => {
    res.sendFile(path.join(__dirname, 'public', 'dashboard.html'));
});




// Protected route example
app.get('/api/me', authenticate, async (req, res) => {
    const user = await User.findById(req.user._id).select('-password');
    res.send(user);
});


app.get('/', (req, res) => {
    res.sendFile(path.join(__dirname, 'public', 'index.html'));
});


app.post('/api/offer-ride', authenticate, async (req, res) => {
    const { departure, arrival, date, seats, vehicleName, vehicleNumber, driverName, phoneNumber } = req.body;
    const ride = new Ride({
        departure,
        arrival,
        date,
        seats,
        vehicleName,
        vehicleNumber,
        driverName,
        phoneNumber,
        userId: req.user._id,
    });
    try {
        await ride.save();
        res.send('Ride offered successfully!');
    } catch (err) {
        console.error(err);
        res.status(500).send('Error offering ride');
    }
});


app.get('/api/search-rides', async (req, res) => {
    const { departure, arrival, date } = req.query;
    try {
        const rides = await Ride.find({
            departure: { $regex: departure, $options: 'i' },
            arrival: { $regex: arrival, $options: 'i' },
            date: { $regex: date, $options: 'i' },
        });
        res.send(rides);
    } catch (err) {
        console.error(err);
        res.status(500).send('Error searching rides');
    }
});


app.post('/api/update-profile', authenticate, async (req, res) => {
    const { name, email, phone, password } = req.body;
    try {
        const user = await User.findByIdAndUpdate(req.user._id, {
            name,
            email,
            phone,
            password
        });
        res.json({ success: true });
    } catch (err) {
        console.error(err);
        res.json({ success: false });
    }
});



const port = process.env.PORT || 3000;
app.listen(port, () => console.log(`Server is running on port ${port}...`));