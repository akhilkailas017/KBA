import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { toast } from "react-toastify";

const Loginpage = () => {
    const [username, setUsername] = useState("");
    const [password, setPassword] = useState("");
    const navigate = useNavigate();

    const loginSubmit = async (e) => {
        e.preventDefault();
        const loginDetails = { username, password };

        const res = await fetch("/api/login", {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
            },
            body: JSON.stringify(loginDetails),
        });

        if (res.ok) {
            const data = await res.json();
            toast.success(`Login successful`);
            return navigate("/dashboard");
        } else {
            toast.error(`Please check your credentials`);
            return navigate("/login");
        }
    };

    return (
        <>
            <main className="flex flex-col justify-center items-center min-h-screen bg-gray-700 py-10 px-4">
                <div className="bg-white rounded-md shadow-md p-6 sm:p-10 w-full max-w-md">
                    <h2 className="text-5xl font-bold mb-6 text-center text-gray-800">Login</h2>
                    <form onSubmit={loginSubmit} className="space-y-4">
                        <div>
                            <label htmlFor="username" className="block text-gray-700 text-sm font-bold mb-1">Username</label>
                            <input 
                                type="text" 
                                id="username" maxLength='30' 
                                className="shadow-sm border rounded-md w-full py-2 px-3 text-gray-700 leading-tight focus:ring focus:ring-orange-200" 
                                value={username}
                                onChange={(e) => setUsername(e.target.value)} 
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
                        <div className="flex items-center justify-between">
                            <button className="bg-orange-500 hover:bg-orange-600 text-white font-bold py-2 px-4 rounded-md focus:outline-none focus:ring-2 focus:ring-orange-300 focus:ring-opacity-50">Login</button>
                            
                        </div>
                        <div className="text-sm text-gray-600 mt-4 text-center">
                            Don't have an account? <a href="/signup" className="text-orange-500 hover:text-orange-700">Sign up</a>
                        </div>
                    </form>
                </div>
            </main>
        </>
    );
};

export default Loginpage;
