const Ride = require('../models/Ride');
const jwt = require('jsonwebtoken');
const dotenv = require('dotenv');

dotenv.config();

const offerRide = async (req, res) => {
  const { startLocation, endLocation, route, stops, time, vehicleName, vehicleNumber, seatsAvailable , date} = req.body;
  
  try {
    // Decode the user ID from the token
    const decoded = jwt.verify(req.headers.authorization.split(' ')[1], process.env.JWT_SECRET);
    const userId = decoded.user.id;

    const ride = new Ride({
      userId,
      startLocation,
      endLocation,
      route,
      stops,
      time,
      vehicleName,
      vehicleNumber,
      seatsAvailable,
      date
    });

    await ride.save();
    res.status(201).json(ride);
  } catch (err) {
    console.error(err.message);
    res.status(500).send('Server error');
  }
};

const searchRides = async (req, res) => {
  const { startLocation, endLocation, date } = req.query;

  try {
    // Find rides matching the search criteria
    const rides = await Ride.find({
      startLocation: new RegExp(startLocation, 'i'),
      endLocation: new RegExp(endLocation, 'i'),
      date: new RegExp(date, 'i')
    });

    if (rides.length === 0) {
      return res.status(404).json({ msg: 'No rides found' });
    }

    res.json(rides);
  } catch (err) {
    console.error(err.message);
    res.status(500).send('Server error');
  }
};

const bookRide = async (req, res) => {
  const { rideId, seatsRequested } = req.body;

  try {
    // Decode the user ID from the token
    const decoded = jwt.verify(req.headers.authorization.split(' ')[1], process.env.JWT_SECRET);
    const userId = decoded.user.id;

    // Find the ride by ID
    const ride = await Ride.findById(rideId);

    if (!ride) {
      return res.status(404).json({ msg: 'Ride not found' });
    }

    // Check if there are enough available seats
    if (ride.seatsAvailable < seatsRequested) {
      return res.status(400).json({ msg: 'Not enough seats available' });
    }

    // Subtract the number of booked seats from available seats
    ride.seatsAvailable -= seatsRequested;

    // Check if the ride is fully booked
    if (ride.seatsAvailable === 0) {
      ride.status = 'fully booked'; // You may add a status field to the model
    }

    await ride.save();

    res.status(200).json({ msg: 'Ride booked successfully', ride });
  } catch (err) {
    console.error(err.message);
    res.status(500).send('Server error');
  }
};

module.exports = { offerRide, searchRides, bookRide };
