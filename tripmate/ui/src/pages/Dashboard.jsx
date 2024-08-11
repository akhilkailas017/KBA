import React, { useState } from 'react';
import { toast } from 'react-toastify';

const Dashboard = () => {
  const [departure, setDeparture] = useState('');
  const [arrival, setArrival] = useState('');
  const [date, setDate] = useState('');
  const [seats, setSeats] = useState('');
  const [searchResults, setSearchResults] = useState([]);

  const searchRides = async (e) => {
    e.preventDefault();

    try {
      const response = await fetch(`/api/searchRides?departure=${departure}&arrival=${arrival}&date=${date}&seats=${seats}`);
      const data = await response.json();

      if (response.status === 404) {
        toast.error('No rides found');
        setSearchResults([]);
      } else {
        setSearchResults(data);
      }
    } catch (error) {
      console.error('Error fetching search results:', error);
      toast.error('Server error');
    }
  };

  const bookRide = async (rideId) => {
    try {
      const response = await fetch('/api/bookRide', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify({ rideId, seats })
      });
      const data = await response.json();
  
      if (response.status !== 200) {
        toast.error(data.msg);
      } else {
        toast.success(data.msg);
        searchRides();
      }
    } catch (error) {
      console.error('Error booking ride:', error);
      toast.error('Server error');
    }
  };
  
  return (
    <>
      <div className="min-h-screen bg-gray-800">
        <section className="bg-gray-800 py-12">
          <h2 className="text-5xl font-bold text-center mb-8 text-white">Search Ride</h2>
          <form 
            className="max-w-xl mx-auto bg-gray-700 p-8 rounded-lg shadow-lg space-y-6"
            onSubmit={searchRides}
          >
            <div className="flex flex-col">
              <label htmlFor="departure" className="text-lg font-semibold text-white">Departure</label>
              <input
                type="text"
                id="departure"
                className="mt-2 p-2 bg-gray-800 text-white rounded-md border border-gray-600 focus:ring-2 focus:ring-orange-400"
                value={departure}
                onChange={(e) => setDeparture(e.target.value)}
                required
              />
            </div>
            <div className="flex flex-col">
              <label htmlFor="arrival" className="text-lg font-semibold text-white">Arrival</label>
              <input
                type="text"
                id="arrival"
                className="mt-2 p-2 bg-gray-800 text-white rounded-md border border-gray-600 focus:ring-2 focus:ring-orange-400"
                value={arrival}
                onChange={(e) => setArrival(e.target.value)}
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
              <label htmlFor="seats" className="text-lg font-semibold text-white">Number of Seats</label>
              <input
                type="number"
                id="seats"
                className="mt-2 p-2 bg-gray-800 text-white rounded-md border border-gray-600 focus:ring-2 focus:ring-orange-400"
                value={seats}
                onChange={(e) => setSeats(e.target.value)}
                required
              />
            </div>
            <button 
              type="submit"
              className="w-full py-3 bg-orange-500 hover:bg-orange-600 text-white font-bold rounded-lg shadow-lg transition ease-in-out duration-150"
            >
              Search Ride
            </button>
          </form>
        </section>

        <section className="bg-gray-800 py-12">
          <h2 className="text-5xl font-bold text-center mb-8 text-white">Search Results</h2>
          <div className="max-w-4xl mx-auto bg-gray-700 p-8 rounded-lg shadow-lg">
            {searchResults.length > 0 ? (
              <ul className="space-y-6">
                {searchResults.map((ride) => (
                  <li key={ride._id} className="flex flex-col md:flex-row justify-between items-center bg-gray-800 p-6 rounded-lg shadow-md">
                    <div className="flex flex-col text-white space-y-2">
                      <span className="font-bold text-lg">Seat Available: {ride.seatsAvailable}</span>
                      <span className="text-lg">Vehicle Name: {ride.vehicleName}</span>
                      <span className="text-lg">Vehicle Number: {ride.vehicleNumber}</span>
                      <span className="text-lg">Driver Name: {ride.offeredBy?.name}</span>
                      <span className="text-lg">Phone Number: {ride.offeredBy?.phone}</span>
                      <span className="text-lg">Start Location: {ride.startLocation}</span>
                      <span className="text-lg">End Location: {ride.endLocation}</span>
                      <span className="text-lg">Time: {ride.time}</span>
                      <span className="text-lg">Route: {ride.route}</span>
                      <span className="text-lg">Stops: {ride.stops.join(', ')}</span>
                    </div>
                    <button
                      onClick={() => bookRide(ride._id)}
                      className="mt-4 md:mt-0 md:ml-6 bg-orange-500 hover:bg-orange-600 text-white font-bold py-2 px-6 rounded-lg shadow-lg transition ease-in-out duration-150"
                    >
                      Book Ride
                    </button>
                  </li>
                ))}
              </ul>
            ) : (
              <p className="text-center text-white">No rides found</p>
            )}
          </div>
        </section>
      </div>
    </>
  );
};

export default Dashboard;
