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
        searchRides(); // Refresh search results
      }
    } catch (error) {
      console.error('Error booking ride:', error);
      toast.error('Server error');
    }
  };
  
  

  return (
    <>
      <section className="bg-gray-600 py-20 h-screen">
        <h2 className="text-3xl font-bold text-center mb-10 text-white">Search Ride</h2>
        <form className="max-w-md mx-auto p-10 bg-white rounded shadow-md" onSubmit={searchRides}>
          <div className="flex flex-col mb-5">
            <label htmlFor="departure" className="text-lg font-bold">Departure</label>
            <input
              type="text"
              id="departure"
              className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
              value={departure}
              onChange={(e) => setDeparture(e.target.value)}
              required
            />
          </div>
          <div className="flex flex-col mb-5">
            <label htmlFor="arrival" className="text-lg font-bold">Arrival</label>
            <input
              type="text"
              id="arrival"
              className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
              value={arrival}
              onChange={(e) => setArrival(e.target.value)}
              required
            />
          </div>
          <div className="flex flex-col mb-5">
            <label htmlFor="date" className="text-lg font-bold">Date</label>
            <input
              type="date"
              id="date"
              className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
              value={date}
              onChange={(e) => setDate(e.target.value)}
              required
            />
          </div>
          <div className="flex flex-col mb-5">
            <label htmlFor="seats" className="text-lg font-bold">Number of Seats</label>
            <input
              type="number"
              id="seats"
              className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
              value={seats}
              onChange={(e) => setSeats(e.target.value)}
              required
            />
          </div>
          <button type="submit" className="bg-orange-500 hover:bg-orange-700 text-white font-bold py-2 px-4 rounded">Search Ride</button>
        </form>
      </section>

      <section className="bg-gray-600 py-20">
        <h2 className="text-3xl font-bold text-center mb-10 text-white">Search Results</h2>
        <div className="max-w-md mx-auto p-10 bg-white rounded shadow-md">
          {searchResults.length > 0 ? (
            <ul>
              {searchResults.map((ride) => (
                <li key={ride._id} className="flex flex-row justify-between mb-5">
                  <div className="flex flex-col">
                    <span className="text-lg font-bold">Seat Available: {ride.seatsAvailable}</span>
                    <span className="text-lg">Vehicle Name: {ride.vehicleName}</span>
                    <span className="text-lg">Vehicle Number: {ride.vehicleNumber}</span>
                    <span className="text-lg">Driver Name: {ride.offeredBy?.name}</span>
                    <span className="text-lg">Phone Number: {ride.offeredBy?.phone}</span>
                    <span className="text-lg">Time: {ride.time}</span>
                    <span className="text-lg">Route: {ride.route}</span>
                    <span className="text-lg">Stops: {ride.stops.join(', ')}</span>
                  </div>
                  <button
                    onClick={() => bookRide(ride._id)}
                    className="bg-orange-500 hover:bg-orange-700 text-white font-bold py-2 px-4 rounded"
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
    </>
  );
};

export default Dashboard;
