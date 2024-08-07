import React, { useState } from 'react'
import { useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import Cookies from 'js-cookie';
import { jwtDecode } from "jwt-decode";

const Offerpage = () => {

    const [startLocation, setStartLocation] = useState('');
    const [endLocation, setEndLocation] = useState('');
    const [route,setRoute]=useState('');
    const [stops,setStops]=useState('');
    const [vehicleName,setVehicleName]=useState('');
    const [vehicleNumber,setVehicleNumber]=useState('');
    const [seatsAvailable,setSeatsAvailable]=useState('');
    const [date, setDate] = useState('');
    const [time, setTime] = useState('');


    const navigate = useNavigate()


    const submitForm = (e) => {
        e.preventDefault()



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
          stops: stops.split(','), // Assuming stops are entered as a comma-separated string
          vehicleName,
          vehicleNumber,
          seatsAvailable,
          date,
          time
      };
    
        const res = addOffer(newOffer)
        toast.success("offer added sucessful")
        navigate('/dashboard')
        console.log(res);
      }
    
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
     <section className="bg-gray-600 py-20">
        <h2 className="text-3xl font-bold text-center mb-10 text-white">Offer Ride</h2>
        <form onSubmit={submitForm} className="max-w-md mx-auto p-10 bg-white rounded shadow-md">
            <div className="flex flex-col mb-5">



                <label for="startLocation" className="text-lg font-bold">Start Location</label>
                <input type="text" id="startLocation" className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"  value={startLocation}
                    onChange={(e) => setStartLocation(e.target.value)} required/>
            </div>



            <div className="flex flex-col mb-5">
                <label for="endLocation" className="text-lg font-bold">End Location</label>
                <input type="text" id="endLocation" className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"  value={endLocation}
                    onChange={(e) => setEndLocation(e.target.value)} required/>
            </div>



            <div className="flex flex-col mb-5">
                <label for="route" className="text-lg font-bold">Route</label>
                <input type="text" id="route" className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"  value={route}
                    onChange={(e) => setRoute(e.target.value)} required/>
            </div>


            <div className="flex flex-col mb-5">
                <label for="stops" className="text-lg font-bold">Stops</label>
                <input type="text" id="stops" className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"  value={stops}
                    onChange={(e) => setStops(e.target.value)} required/>
            </div>
            
            <div className="flex flex-col mb-5">
                <label for="vehicleName" className="text-lg font-bold">Vehicle Name</label>
                <input type="text" id="vehicleName" className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline" value={vehicleName}
                    onChange={(e) => setVehicleName(e.target.value)} required/>
            </div>
            <div className="flex flex-col mb-5">
                <label for="vehicleNumber" className="text-lg font-bold">Vehicle No</label>
                <input type="text" id="vehicleNumber" className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline" value={vehicleNumber}
                    onChange={(e) => setVehicleNumber(e.target.value)} required/>
            </div>
            <div className="flex flex-col mb-5">
                <label for="seatsAvailable" className="text-lg font-bold">Passenger Capacity</label>
                <input type="number" id="seatsAvailable" className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline" value={seatsAvailable}
                    onChange={(e) => setSeatsAvailable(e.target.value)} required/>
            </div>
            <div className="flex flex-col mb-5">
                <label for="date" className="text-lg font-bold">Date</label>
                <input type="date" id="date" className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline" value={date}
                    onChange={(e) => setDate(e.target.value)} required/>
            </div>
            <div className="flex flex-col mb-5">
                <label for="time" className="text-lg font-bold">Time</label>
                <input type="time" id="time" className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline" value={time}
                    onChange={(e) => setTime(e.target.value)} required/>
            </div>
            <button type="submit" className="bg-orange-500 hover:bg-orange-700 text-white font-bold py-2 px-4 rounded">Offer Ride</button>
        </form>
    </section>
    </>
  )
}

export default Offerpage