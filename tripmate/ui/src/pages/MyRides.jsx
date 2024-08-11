import React, { useEffect, useState } from "react";

const MyRides = () => {
  const [rides, setRides] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchRides = async () => {
      try {
        const response = await fetch("/api/my-rides", {
          credentials: "include",
        });
        if (!response.ok) {
          throw new Error("Error fetching rides");
        }
        const data = await response.json();
        setRides(data);
      } catch (error) {
        setError("Error fetching rides");
      } finally {
        setLoading(false);
      }
    };

    fetchRides();
  }, []);

  const deleteRide = async (rideId) => {
    try {
      const response = await fetch(`/api/rides/${rideId}`, {
        method: "DELETE",
        credentials: "include",
      });
      if (!response.ok) {
        throw new Error("Error deleting ride");
      }
      setRides(rides.filter((ride) => ride._id !== rideId));
    } catch (error) {
      console.error("Error deleting ride:", error);
    }
  };

  if (loading)
    return (
      <div className="flex justify-center items-center min-h-screen">
        <div className="spinner-border animate-spin inline-block w-8 h-8 border-4 rounded-full border-t-white border-gray-300"></div>
      </div>
    );

  if (error)
    return (
      <div className="container mx-auto p-4">
        <div className="text-red-500 text-lg">{error}</div>
      </div>
    );

  return (
    <div className="min-h-screen bg-gray-900 text-white py-10 px-4">
      <h1 className="text-5xl font-bold mb-8 text-center text-white">Offered Rides</h1>
      {rides.length === 0 ? (
        <div className="text-center text-gray-400">No rides offered yet.</div>
      ) : (
        <ul className="space-y-6 max-w-4xl mx-auto">
          {rides.map((ride) => (
            <li key={ride._id} className="bg-gray-800 p-6 rounded-lg shadow-md">
              <div className="flex flex-col md:flex-row md:justify-between">
                <div>
                  <h2 className="text-2xl font-semibold text-white">Route: {ride.route}</h2>
                  <p className="mt-2">Start Location: {ride.startLocation}</p>
                  <p className="mt-2">End Location: {ride.endLocation}</p>
                  <p className="mt-2">Date: {ride.date}</p>
                  <p className="mt-2">Time: {ride.time}</p>
                </div>
                <button
                  onClick={() => deleteRide(ride._id)}
                  className="mt-4 md:mt-0 md:ml-4 bg-red-500 text-white py-2 px-4 rounded-lg hover:bg-red-700"
                >
                  Delete
                </button>
              </div>
            </li>
          ))}
        </ul>
      )}
    </div>
  );
};

export default MyRides;
