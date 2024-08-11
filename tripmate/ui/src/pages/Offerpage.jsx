import React, { useState } from 'react';
import { useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import Cookies from 'js-cookie';
import { jwtDecode } from "jwt-decode";

const Offerpage = () => {

  const [startLocation, setStartLocation] = useState('');
  const [endLocation, setEndLocation] = useState('');
  const [route, setRoute] = useState('');
  const [stops, setStops] = useState('');
  const [vehicleName, setVehicleName] = useState('');
  const [vehicleNumber, setVehicleNumber] = useState('');
  const [seatsAvailable, setSeatsAvailable] = useState('');
  const [date, setDate] = useState('');
  const [time, setTime] = useState('');

  const navigate = useNavigate();

  const submitForm = (e) => {
    e.preventDefault();

    const token = Cookies.get('Authtoken');
    if (!token) {
      toast.error("You need to login first");
      navigate('/login');
      return;
    }

    const decodedToken = jwtDecode(token);
    const userId = decodedToken.userId;

    const newOffer = {
      userId,
      startLocation,
      endLocation,
      route,
      stops: stops.split(','), 
      vehicleName,
      vehicleNumber,
      seatsAvailable,
      date,
      time,
    };

    const res = addOffer(newOffer);
    toast.success("Offer added successfully");
    navigate('/dashboard');
    console.log(res);
  };

  const addOffer = async (newOffer) => {
    try {
      const response = await fetch("/api/offer", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(newOffer),
      });
      const data = await response.json();
      console.log(data);
    } catch (error) {
      throw error;
    }
  };

  return (
    <>
      <section className="bg-gray-800 py-20">
        <h2 className="text-5xl font-bold text-center mb-8 text-white">Offer Ride</h2>
        <form 
          onSubmit={submitForm} 
          className="max-w-xl mx-auto bg-gray-700 p-8 rounded-lg shadow-lg space-y-6"
        >
          <div className="flex flex-col">
            <label htmlFor="startLocation" className="text-lg font-semibold text-white">Start Location</label>
            <input 
              type="text" 
              id="startLocation" 
              className="mt-2 p-2 bg-gray-800 text-white rounded-md border border-gray-600 focus:ring-2 focus:ring-orange-400" 
              value={startLocation}
              onChange={(e) => setStartLocation(e.target.value)} 
              required
            />
          </div>

          <div className="flex flex-col">
            <label htmlFor="endLocation" className="text-lg font-semibold text-white">End Location</label>
            <input 
              type="text" 
              id="endLocation" 
              className="mt-2 p-2 bg-gray-800 text-white rounded-md border border-gray-600 focus:ring-2 focus:ring-orange-400" 
              value={endLocation}
              onChange={(e) => setEndLocation(e.target.value)} 
              required
            />
          </div>

          <div className="flex flex-col">
            <label htmlFor="route" className="text-lg font-semibold text-white">Route</label>
            <input 
              type="text" 
              id="route" 
              className="mt-2 p-2 bg-gray-800 text-white rounded-md border border-gray-600 focus:ring-2 focus:ring-orange-400" 
              value={route}
              onChange={(e) => setRoute(e.target.value)} 
              required
            />
          </div>

          <div className="flex flex-col">
            <label htmlFor="stops" className="text-lg font-semibold text-white">Stops</label>
            <input 
              type="text" 
              id="stops" 
              className="mt-2 p-2 bg-gray-800 text-white rounded-md border border-gray-600 focus:ring-2 focus:ring-orange-400" 
              value={stops}
              onChange={(e) => setStops(e.target.value)} 
              required
            />
          </div>

          <div className="flex flex-col">
            <label htmlFor="vehicleName" className="text-lg font-semibold text-white">Vehicle Name</label>
            <input 
              type="text" 
              id="vehicleName" 
              className="mt-2 p-2 bg-gray-800 text-white rounded-md border border-gray-600 focus:ring-2 focus:ring-orange-400" 
              value={vehicleName}
              onChange={(e) => setVehicleName(e.target.value)} 
              required
            />
          </div>

          <div className="flex flex-col">
            <label htmlFor="vehicleNumber" className="text-lg font-semibold text-white">Vehicle Number</label>
            <input 
              type="text" 
              id="vehicleNumber" 
              className="mt-2 p-2 bg-gray-800 text-white rounded-md border border-gray-600 focus:ring-2 focus:ring-orange-400" 
              value={vehicleNumber}
              onChange={(e) => setVehicleNumber(e.target.value)} 
              required
            />
          </div>

          <div className="flex flex-col">
            <label htmlFor="seatsAvailable" className="text-lg font-semibold text-white">Passenger Capacity</label>
            <input 
              type="number" 
              id="seatsAvailable" 
              className="mt-2 p-2 bg-gray-800 text-white rounded-md border border-gray-600 focus:ring-2 focus:ring-orange-400" 
              value={seatsAvailable}
              onChange={(e) => setSeatsAvailable(e.target.value)} 
              required
            />
          </div>

          <div className="flex flex-col">
            <label htmlFor="date" className="text-lg font-semibold text-white">Date</label>
            <input 
              type="date" 
              id="date" 
              className="mt-2 p-2 bg-gray-800 text-white rounded-md border border-gray-600 focus:ring-2 focus:ring-orange-400" 
              value={date}
              onChange={(e) => setDate(e.target.value)} 
              required
            />
          </div>

          <div className="flex flex-col">
            <label htmlFor="time" className="text-lg font-semibold text-white">Time</label>
            <input 
              type="time" 
              id="time" 
              className="mt-2 p-2 bg-gray-800 text-white rounded-md border border-gray-600 focus:ring-2 focus:ring-orange-400" 
              value={time}
              onChange={(e) => setTime(e.target.value)} 
              required
            />
          </div>

          <button 
            type="submit" 
            className="w-full py-3 bg-orange-500 hover:bg-orange-600 text-white font-bold rounded-lg shadow-lg transition ease-in-out duration-150"
          >
            Offer Ride
          </button>
        </form>
      </section>
    </>
  );
};

export default Offerpage;
