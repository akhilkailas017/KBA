import React from 'react';
import bg1 from '../assets/bg-1.jpg'
import Contact from '../components/Contact';

const IndexPage = () => {
  return (
    <>
      <div
        className="bg-cover bg-center h-screen"
        style={{ backgroundImage: `url(${bg1})` }}
        aria-label="Background image"
      >
        <div className="flex flex-col justify-center items-center h-full text-center text-white">
          <div className="text-[150px] font-bold mb-4">Welcome to Tripmate</div>
          <div className="text-[30px] font-bold mb-4">
            Connecting travelers with trusted drivers, making travel affordable and convenient.
          </div>
        </div>
      </div>

      <section className="py-20 bg-gray-800">
        <div className="container mx-auto p-10">
          <h2
            className="text-3xl font-bold mb-4 text-center text-white"
            aria-label="What is Ride Sharing?"
          >
            What is Ride Sharing?
          </h2>
          <p className="text-lg text-center mb-4 text-white">
            Ride sharing is a transportation service that connects passengers with drivers who are traveling in the same direction. It's a convenient, affordable, and environmentally friendly way to travel. With Tripmate, you can find a ride that fits your schedule and budget, and enjoy a safe and comfortable journey.
          </p>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4 h-[200px] text-center">
            <div className="bg-white p-4 rounded shadow mb-4">
              <h3 className="text-[25px] font-bold" aria-label="Convenient">
                Convenient
              </h3>
              <p className="text-sm font-bold">Book a ride with just a few taps on your phone</p>
            </div>
            <div className="bg-white p-4 rounded shadow mb-4">
              <h3 className="font-bold text-[25px]" aria-label="Affordable">
                Affordable
              </h3>
              <p className="text-sm font-bold">Save money on fuel, tolls, and parking</p>
            </div>
            <div className="bg-white p-4 rounded shadow mb-4">
              <h3 className="font-bold text-[25px]" aria-label="Environmentally Friendly">
                Environmentally Friendly
              </h3>
              <p className="text-sm font-bold">Reduce your carbon footprint by sharing a ride</p>
            </div>
            <div className="bg-white p-4 rounded shadow mb-4">
              <h3 className="font-bold text-[25px]" aria-label="Safe">
                Safe
              </h3>
              <p className="text-sm font-bold">Our drivers are vetted and rated by our community</p>
            </div>
          </div>
        </div>
      </section>
      <Contact/>
    </>
  );
};

export default IndexPage;