import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { toast } from "react-toastify";

const AdminLogin = () => {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const navigate = useNavigate();

  const loginSubmit = async (e) => {
    e.preventDefault();
    const loginDetails = { username, password };

    const res = await fetch("/api/admin/login", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(loginDetails),
      credentials: "include",
    });

    if (res.ok) {
      toast.success("Admin login successful");
      navigate("/admin/dashboard");
    } else {
      toast.error("Invalid credentials");
    }
  };

  return (
    <main className="flex justify-center items-center min-h-screen bg-gray-900">
      <div className="bg-gray-800 text-white rounded-lg shadow-lg p-8 w-full max-w-md">
        <h2 className="text-4xl font-bold text-white mb-6 text-center">Admin Login</h2>
        <form onSubmit={loginSubmit} className="space-y-6">
          <div>
            <label className="block text-sm font-bold mb-2">Username</label>
            <input
              type="text"
              className="w-full p-3 border border-gray-700 rounded-lg bg-gray-700 text-white focus:outline-none focus:ring-2 focus:ring-orange-500"
              value={username}
              onChange={(e) => setUsername(e.target.value)}
            />
          </div>
          <div>
            <label className="block text-sm font-bold mb-2">Password</label>
            <input
              type="password"
              className="w-full p-3 border border-gray-700 rounded-lg bg-gray-700 text-white focus:outline-none focus:ring-2 focus:ring-orange-500"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
            />
          </div>
          <div className="flex items-center justify-between">
            <button className="w-full py-3 bg-orange-500 hover:bg-orange-700 text-white font-bold rounded-lg">
              Login
            </button>
          </div>
        </form>
      </div>
    </main>
  );
};

export default AdminLogin;
