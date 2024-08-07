import React, { useState } from 'react'
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

  // signup
  const signupSubmit = async (userDetails) => {
    const res = await fetch("/api/register", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(userDetails),
    });

    // return;
    console.log(res);
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
   <>
   <main className="flex flex-col justify-center items-center bg-gray-600 pt-10 pb-10">
        <div className="bg-white rounded-md shadow-md p-10 w-1/2">
            <h2 className="text-3xl font-bold mb-4">Sign up</h2>
            <form onSubmit={submitForm}>
                <div className="mb-4">
                    <label for="username" className="block text-gray-700 text-sm font-bold mb-2">Username</label>
                    <input type="text" id="username" className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline" value={userName}
              onChange={(e) => setUserName(e.target.value)} />
                </div>
                <div className="mb-4">
                    <label for="fullName" className="block text-gray-700 text-sm font-bold mb-2">Name</label>
                    <input type="text" id="fullName" className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline" value={name}
              onChange={(e) => setName(e.target.value)} />
                </div>
                <div className="mb-4">
                    <label for="gender" className="block text-gray-700 text-sm font-bold mb-2">Gender</label>
                    <select id="gender" className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline" value={gender}
              onChange={(e) => setGender(e.target.value)}>
                        <option value="">Select</option>
                        <option value="male">Male</option>
                        <option value="female">Female</option>
                    </select>
                </div>
                <div className="mb-4">
                    <label for="age" className="block text-gray-700 text-sm font-bold mb-2">Age</label>
                    <input type="number" id="age" className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline" value={age}
              onChange={(e) => setAge(e.target.value)} />
                </div>
                <div className="mb-4">
                    <label for="email" className="block text-gray-700 text-sm font-bold mb-2">Email</label>
                    <input type="email" id="email" className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline" value={email}
              onChange={(e) => setEmail(e.target.value)} />
                </div>
                <div className="mb-4">
                    <label for="phone" className="block text-gray-700 text-sm font-bold mb-2">Phone Number</label>
                    <input type="text" id="phone" className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline" value={phone}
              onChange={(e) => setPhone(e.target.value)} />
                </div>
            
                <div className="mb-4">
                    <label for="password" className="block text-gray-700 text-sm font-bold mb-2">Password</label>
                    <input type="password" id="password" className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline" value={password}
              onChange={(e) => setPassword(e.target.value)} />
                </div>
                <div className="flex items-center justify-between">
                    <button className="bg-orange-500 hover:bg-orange-700 text-white font-bold py-2 px-4 rounded">Sign up</button>
                </div>
            </form>
        </div>
    </main>
   </>
  )
}

export default Signuppage