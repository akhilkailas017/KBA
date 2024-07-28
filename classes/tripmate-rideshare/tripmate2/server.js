const express = require('express');
const app = express();
const port = 3000;
const bodyParser = require('body-parser');
const mongoose = require('mongoose');

// Connect to MongoDB
mongoose.connect('mongodb://localhost/tripmate', { useNewUrlParser: true, useUnifiedTopology: true });

// Define models
const userSchema = new mongoose.Schema({
  name: String,
  email: String,
  phone: String,
  username: String,
  password: String
});

const rideSchema = new mongoose.Schema({
  departure: String,
  arrival: String,
  date: Date,
  seats: Number,
  vehicleName: String,
  vehicleNumber: String,
  driverName: String,
  phoneNumber: String
});

const bookingSchema = new mongoose.Schema({
  rideId: String,
  userId: String,
  departure: String,
  arrival: String,
  date: Date,
  seats: Number,
  vehicleName: String,
  vehicleNumber: String,
  driverName: String,
  phoneNumber: String
});

const User = mongoose.model('User', userSchema);
const Ride = mongoose.model('Ride', rideSchema);
const Booking = mongoose.model('Booking', bookingSchema);

// Middleware
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

// Routes
app.get('/', (req, res) => {
  res.sendFile(__dirname + '/index.html');
});

app.get('/profile', (req, res) => {
  res.sendFile(__dirname + '/profile.html');
});

app.get('/dashboard', (req, res) => {
  res.sendFile(__dirname + '/dashboard.html');
});

app.post('/register', (req, res) => {
  const { name, email, phone, username, password } = req.body;
  const user = new User({ name, email, phone, username, password });
  user.save((err, user) => {
    if (err) {
      res.status(400).send({ message: 'Error registering user' });
    } else {
      res.send({ message: 'User registered successfully' });
    }
  });
});

app.post('/login', (req, res) => {
  const { username, password } = req.body;
  User.findOne({ username, password }, (err, user) => {
    if (err ||!user) {
      res.status(401).send({ message: 'Invalid username or password' });
    } else {
      res.send({ message: 'Login successful' });
    }
  });
});

app.get('/rides', (req, res) => {
  Ride.find().then((rides) => {
    res.send(rides);
  }).catch((err) => {
    res.status(500).send({ message: 'Error fetching rides' });
  });
});

app.post('/book-ride', (req, res) => {
  const { rideId, userId } = req.body;
  const booking = new Booking({ rideId, userId });
  booking.save((err, booking) => {
    if (err) {
      res.status(400).send({ message: 'Error booking ride' });
    } else {
      res.send({ message: 'Ride booked successfully' });
    }
  });
});

app.get('/booking-history', (req, res) => {
  Booking.find().then((bookings) => {
    res.send(bookings);
  }).catch((err) => {
    res.status(500).send({ message: 'Error fetching booking history' });
  });
});

app.post('/update-profile', (req, res) => {
  const { name, email, phone } = req.body;
  User.findByIdAndUpdate(req.user.id, { name, email, phone }, (err, user) => {
    if (err) {
      res.status(400).send({ message: 'Error updating profile' });
    } else {
      res.send({ message: 'Profile updated successfully' });
    }
  });
});

// Start server
app.listen(port, () => {
  console.log(`Server started on port ${port}`);
});