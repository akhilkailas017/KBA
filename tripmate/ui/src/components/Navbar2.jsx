import React from 'react';
import Logout from './Logout';

const Navbar2 = () => {
  return (
    <nav className="bg-gray-800 text-white">
      <div className="container mx-auto flex flex-col md:flex-row justify-between items-center py-4 px-6">
        
        <div className="text-5xl font-bold mb-4 md:mb-0">Tripmate</div>

        
        <div className="flex flex-col md:flex-row md:gap-6 gap-4">
          <a href="/dashboard" className="text-lg font-semibold hover:text-gray-400">Dashboard</a>
          <a href="/offer" className="text-lg font-semibold hover:text-gray-400">Offer Ride</a>
          <a href="/profile" className="text-lg font-semibold hover:text-gray-400">Profile</a>
          <a href="/history" className="text-lg font-semibold hover:text-gray-400">History</a>
          <a href="/myrides" className="text-lg font-semibold hover:text-gray-400">Offered Rides</a>
          <a href="/complaintregister" className="text-lg font-semibold hover:text-gray-400">Complaint</a>
          <Logout />
        </div>
      </div>
    </nav>
  );
};

export default Navbar2;
