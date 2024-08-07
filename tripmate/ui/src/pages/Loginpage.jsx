import React, { useState, useEffect } from "react";
// import { jwtDecode } from "jwt-decode";
import { Link, useNavigate } from "react-router-dom";
import { toast } from "react-toastify";

const Loginpage = () => {

    const [username, setUsername] = useState("");
    const [password, setPassword] = useState("");
    const navigate = useNavigate();

    const loginSubmit = async (e) => {
        e.preventDefault();
        const loginDetails = {
            username,
            password,
        };

        const res = await fetch("/api/login", {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
            },
            body: JSON.stringify(loginDetails),
        });
        console.log(res, "login res from /login");

        if (res.ok) {
            // console.log('/login resp json', data)
            const data = await res.json();
            // console.log('usertype ', userType)
            toast.success(`login success`);
            return navigate("/dashboard");

        } else {
            toast.error(`Please check your credentials`);
            return navigate("/login");
        }

    }


    return (
        <>
            <main className="flex flex-col justify-center items-center h-screen bg-gray-600">
                <div className="bg-white rounded-md shadow-md p-10 w-1/2">
                    <h2 className="text-3xl font-bold mb-4">Login</h2>
                    <form onSubmit={loginSubmit}>
                        <div className="mb-4">
                            <label for="username" className="block text-gray-700 text-sm font-bold mb-2">Username</label>
                            <input type="text" id="username" className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline" value={username}
              onChange={(e) => setUsername(e.target.value)} />
                        </div>
                        <div className="mb-4">
                            <label for="password" className="block text-gray-700 text-sm font-bold mb-2">Password</label>
                            <input type="password" id="password" className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline" value={password}
              onChange={(e) => setPassword(e.target.value)} />
                        </div>
                        <div className="flex items-center justify-between">
                            <button className="bg-orange-500 hover:bg-orange-700 text-white font-bold py-2 px-4 rounded">Login</button>
                            <a href="#" className="text-sm text-gray-600 hover:text-gray-900">Forgot Password?</a>
                        </div>
                        <div className="text-sm text-gray-600 mt-4">
                            Don't have an account? <a href="/signup" className="text-orange-500 hover:text-orange-700">Sign up</a>
                        </div>
                    </form>
                </div>
            </main>
        </>
    )
}

export default Loginpage