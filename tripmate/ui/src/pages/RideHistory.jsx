import React, { useEffect, useState } from 'react';
import { toast } from 'react-toastify';

const RideHistory = () => {
  const [rideHistory, setRideHistory] = useState([]);

  const fetchRideHistory = async () => {
    try {
      const response = await fetch('/api/rideHistory');
      const data = await response.json();

      if (response.status !== 200) {
        toast.error(data.msg);
      } else {
        setRideHistory(data);
      }
    } catch (error) {
      console.error('Error fetching ride history:', error);
      toast.error('Server error');
    }
  };

  const cancelRide = async (rideId) => {
    try {
      const response = await fetch('/api/cancelRide', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify({ rideId })
      });
      const data = await response.json();

      if (response.status !== 200) {
        toast.error(data.msg);
      } else {
        toast.success(data.msg);
        fetchRideHistory(); // Refresh ride history
      }
    } catch (error) {
      console.error('Error canceling ride:', error);
      toast.error('Server error');
    }
  };

  useEffect(() => {
    fetchRideHistory();
  }, []);

  const isCancelAllowed = (bookingDate) => {
    const bookingTime = new Date(bookingDate);
    const currentTime = new Date();
    const diffInMs = currentTime - bookingTime;
    const diffInHours = diffInMs / (1000 * 60 * 60);
    return diffInHours <= 6;
    // const diffInMinutes = diffInMs / (1000 * 60);
    // return diffInMinutes <= 1;
  };

  return (
    <div className='bg-gray-600 h-screen'>
    <section className="bg-gray-600 py-20 h-auto">
      <h2 className="text-3xl font-bold text-center mb-10 text-white">Ride History</h2>
      <div className="max-w-md mx-auto p-10 bg-white rounded shadow-md">
        {rideHistory.length > 0 ? (
          <ul>
            {rideHistory.map((ride) => (
              <li key={ride._id} className="flex flex-row justify-between mb-5">
                <div className="flex flex-col">
                  <span className="text-lg font-bold">Seat Available: {ride.seatsAvailable}</span>
                  <span className="text-lg">Vehicle Name: {ride.vehicleName}</span>
                  <span className="text-lg">Vehicle Number: {ride.vehicleNumber}</span>
                  <span className="text-lg">Time: {ride.time}</span>
                  <span className="text-lg">Route: {ride.route}</span>
                  <span className="text-lg">Stops: {ride.stops.join(', ')}</span>
                  <span className="text-lg">Date: {ride.date}</span>
                  <span className="text-lg">Driver Name: {ride.offeredBy?.name}</span>
                  <span className="text-lg">Driver Username: {ride.offeredBy?.username}</span>
                  <span className="text-lg">Driver Phone Number: {ride.offeredBy?.phone}</span>
                </div>
                {isCancelAllowed(ride.bookings[0].bookingDate) && (
                  <button
                    onClick={() => cancelRide(ride._id)}
                    className="bg-red-500 hover:bg-red-700 text-white font-bold py-2 px-4 rounded"
                  >
                    Cancel Ride
                  </button>
                )}
              </li>
            ))}
          </ul>
        ) : (
          <p className="text-center text-white">No ride history found</p>
        )}
      </div>
    </section>
    </div>
  );
};

export default RideHistory;
