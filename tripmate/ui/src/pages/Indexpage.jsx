import React from 'react';
import bg1 from '../assets/bg-1.jpg';
import Contact from '../components/Contact';

const IndexPage = () => {
  return (
    <>
      <div
        className="bg-cover bg-center h-screen flex items-center justify-center text-center text-white"
        style={{ backgroundImage: `url(${bg1})` }}
        aria-label="Background image"
      >
        <div className="px-6 sm:px-12 md:px-24">
          <h1 className="text-5xl md:text-9xl font-bold mb-4">Welcome to Tripmate</h1>
          <p className="text-lg md:text-2xl font-medium mb-6">
            Connecting travelers with trusted drivers, making travel affordable and convenient.
          </p>
        </div>
      </div>

      <section className="py-16 bg-gray-800">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <h2 className="text-3xl md:text-4xl font-bold mb-8 text-center text-white">
            What is Ride Sharing?
          </h2>
          <p className="text-base md:text-lg text-center mb-8 text-white">
            Ride sharing is a transportation service that connects passengers with drivers who are traveling in the same direction. It's a convenient, affordable, and environmentally friendly way to travel. With Tripmate, you can find a ride that fits your schedule and budget, and enjoy a safe and comfortable journey.
          </p>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
            <div className="bg-white p-6 rounded-lg shadow-lg flex flex-col items-center text-center">
              <h3 className="text-xl font-semibold mb-3">Convenient</h3>
              <p className="text-sm font-medium">Book a ride with just a few taps on your phone</p>
            </div>
            <div className="bg-white p-6 rounded-lg shadow-lg flex flex-col items-center text-center">
              <h3 className="text-xl font-semibold mb-3">Affordable</h3>
              <p className="text-sm font-medium">Save money on fuel, tolls, and parking</p>
            </div>
            <div className="bg-white p-6 rounded-lg shadow-lg flex flex-col items-center text-center">
              <h3 className="text-xl font-semibold mb-3">Environmentally Friendly</h3>
              <p className="text-sm font-medium">Reduce your carbon footprint by sharing a ride</p>
            </div>
            <div className="bg-white p-6 rounded-lg shadow-lg flex flex-col items-center text-center">
              <h3 className="text-xl font-semibold mb-3">Safe</h3>
              <p className="text-sm font-medium">Our drivers are vetted and rated by our community</p>
            </div>
          </div>
        </div>
      </section>
      <Contact />
    </>
  );
};

export default IndexPage;
