import React, { useEffect, useState } from 'react';
import { toast } from 'react-toastify';

const RideHistory = () => {
  const [rideHistory, setRideHistory] = useState([]);
  const [messages, setMessages] = useState([]);

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

  const fetchMessages = async () => {
    try {
      const response = await fetch('/api/profile2');
      const data = await response.json();

      if (response.status !== 200) {
        toast.error('Failed to fetch messages');
      } else {
        setMessages(data.messages || []);
      }
    } catch (error) {
      console.error('Error fetching messages:', error);
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
        fetchRideHistory(); 
      }
    } catch (error) {
      console.error('Error canceling ride:', error);
      toast.error('Server error');
    }
  };

  useEffect(() => {
    fetchRideHistory();
    fetchMessages(); 
  }, []);

  const isCancelAllowed = (bookingDate) => {
    const bookingTime = new Date(bookingDate);
    const currentTime = new Date();
    const diffInMs = currentTime - bookingTime;
    const diffInHours = diffInMs / (1000 * 60 * 60);
    return diffInHours <= 6;
  };

  return (
    <div className="bg-gray-900 min-h-screen py-10 px-4">
      <section className="flex flex-col md:flex-row gap-8">
        
        <div className="bg-gray-800 p-6 rounded-lg shadow-md w-full md:w-1/2 lg:w-1/3">
          <h3 className="text-2xl font-bold text-white mb-4 text-center">Messages</h3>
          {messages.length > 0 ? (
            <ul className="space-y-3">
              {messages.map((message, index) => (
                <li key={index} className="text-gray-300 bg-gray-700 p-3 rounded">
                  {message}
                </li>
              ))}
            </ul>
          ) : (
            <p className="text-gray-400 text-center">No messages found</p>
          )}
        </div>

        
        <div className="bg-gray-800 p-6 rounded-lg shadow-md w-full md:w-1/2 lg:w-2/3">
          <h2 className="text-3xl font-bold text-white mb-6 text-center">Ride History</h2>
          {rideHistory.length > 0 ? (
            <ul className="space-y-6">
              {rideHistory.map((ride) => (
                <li key={ride._id} className="bg-gray-700 p-4 rounded-lg flex flex-col md:flex-row justify-between">
                  <div className="space-y-2 text-gray-300">
                    <span className="block font-bold">Seat Available: {ride.seatsAvailable}</span>
                    <span className="block">Vehicle Name: {ride.vehicleName}</span>
                    <span className="block">Vehicle Number: {ride.vehicleNumber}</span>
                    <span className="block">Time: {ride.time}</span>
                    <span className="block">Route: {ride.route}</span>
                    <span className="block">Stops: {ride.stops.join(', ')}</span>
                    <span className="block">Date: {ride.date}</span>
                    <span className="block">Driver Name: {ride.offeredBy?.name}</span>
                    <span className="block">Driver Username: {ride.offeredBy?.username}</span>
                    <span className="block">Driver Phone Number: {ride.offeredBy?.phone}</span>
                  </div>
                  {isCancelAllowed(ride.bookings[0].bookingDate) && (
                    <button
                      onClick={() => cancelRide(ride._id)}
                      className="mt-4 md:mt-0 bg-red-500 hover:bg-red-600 text-white font-bold py-2 px-4 rounded-lg"
                    >
                      Cancel Ride
                    </button>
                  )}
                </li>
              ))}
            </ul>
          ) : (
            <p className="text-center text-gray-400">No ride history found</p>
          )}
        </div>
      </section>
    </div>
  );
};

export default RideHistory;
