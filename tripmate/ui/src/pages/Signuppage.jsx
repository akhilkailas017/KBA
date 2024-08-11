import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { toast } from 'react-toastify';

const Signuppage = () => {

  const [userName, setUserName] = useState("");
  const [name, setName] = useState("");
  const [gender, setGender] = useState("male");
  const [age, setAge] = useState("");
  const [email, setEmail] = useState("");
  const [phone, setPhone] = useState("");
  const [password, setPassword] = useState("");

  const navigate = useNavigate();

  const signupSubmit = async (userDetails) => {
    const res = await fetch("/api/register", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(userDetails),
    });

    if (res.ok) {
      toast.success(`Signup success`);
      return navigate("/login");
    } else {
      toast.error(`Please check the input data`);
      return navigate("/sign-up");
    }
  };

  const submitForm = (e) => {
    e.preventDefault();
    const userDetails = {
      userName,
      name,
      gender,
      age,
      email,
      phone,
      password
    };

    signupSubmit(userDetails);
  };

  return (
    <main className="flex flex-col justify-center items-center bg-gray-700 min-h-screen py-10 px-4">
      <div className="bg-white rounded-md shadow-md p-6 sm:p-10 w-full max-w-lg">
        <h2 className="text-5xl font-bold text-center mb-6 text-gray-800">Sign up</h2>
        <form onSubmit={submitForm} className="space-y-4">
          <div>
            <label htmlFor="username" className="block text-gray-700 text-sm font-bold mb-1">Username</label>
            <input 
              type="text" 
              id="username"
              maxLength='30' 
              className="shadow-sm border rounded-md w-full py-2 px-3 text-gray-700 leading-tight focus:ring focus:ring-orange-200" 
              value={userName}
              onChange={(e) => setUserName(e.target.value)} 
              required
            />
          </div>
          <div>
            <label htmlFor="fullName" className="block text-gray-700 text-sm font-bold mb-1">Name</label>
            <input 
              type="text" 
              id="fullName"
              maxLength='30' 
              className="shadow-sm border rounded-md w-full py-2 px-3 text-gray-700 leading-tight focus:ring focus:ring-orange-200" 
              value={name}
              onChange={(e) => setName(e.target.value)} 
              required
            />
          </div>
          <div>
            <label htmlFor="gender" className="block text-gray-700 text-sm font-bold mb-1">Gender</label>
            <select 
              id="gender" 
              className="shadow-sm border rounded-md w-full py-2 px-3 text-gray-700 leading-tight focus:ring focus:ring-orange-200" 
              value={gender}
              onChange={(e) => setGender(e.target.value)}
              required
            >
              <option value="">Select</option>
              <option value="male">Male</option>
              <option value="female">Female</option>
            </select>
          </div>
          <div>
            <label htmlFor="age" className="block text-gray-700 text-sm font-bold mb-1">Age</label>
            <input 
              type="number" 
              id="age" 
              className="shadow-sm border rounded-md w-full py-2 px-3 text-gray-700 leading-tight focus:ring focus:ring-orange-200" 
              value={age}
              onChange={(e) => setAge(e.target.value)} 
              required
            />
          </div>
          <div>
            <label htmlFor="email" className="block text-gray-700 text-sm font-bold mb-1">Email</label>
            <input 
              type="email" 
              id="email"
              maxLength='30' 
              className="shadow-sm border rounded-md w-full py-2 px-3 text-gray-700 leading-tight focus:ring focus:ring-orange-200" 
              value={email}
              onChange={(e) => setEmail(e.target.value)} 
              required
            />
          </div>
          <div>
            <label htmlFor="phone" className="block text-gray-700 text-sm font-bold mb-1">Phone Number</label>
            <input 
              type="text" 
              id="phone"
              maxLength='10' 
              className="shadow-sm border rounded-md w-full py-2 px-3 text-gray-700 leading-tight focus:ring focus:ring-orange-200" 
              value={phone}
              onChange={(e) => setPhone(e.target.value)} 
              required
            />
          </div>
          <div>
            <label htmlFor="password" className="block text-gray-700 text-sm font-bold mb-1">Password</label>
            <input 
              type="password" 
              id="password"
              maxLength='30' 
              className="shadow-sm border rounded-md w-full py-2 px-3 text-gray-700 leading-tight focus:ring focus:ring-orange-200" 
              value={password}
              onChange={(e) => setPassword(e.target.value)} 
              required
            />
          </div>
          <div className="flex items-center justify-center mt-6">
            <button className="bg-orange-500 hover:bg-orange-600 text-white font-bold py-2 px-6 rounded-md focus:outline-none focus:ring-2 focus:ring-orange-300 focus:ring-opacity-50">Sign up</button>
          </div>
        </form>
      </div>
    </main>
  );
}

export default Signuppage;
