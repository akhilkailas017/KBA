import React, { useEffect, useState } from "react";
import { toast } from "react-toastify";

const AdminDashboard = () => {
  const [users, setUsers] = useState([]);
  const [search, setSearch] = useState("");

  const fetchUsers = async () => {
    const res = await fetch("/api/admin/users", {
      method: "GET",
      headers: { "Content-Type": "application/json" },
    });

    if (res.ok) {
      const data = await res.json();
      setUsers(data);
    } else {
      toast.error("Failed to fetch users");
    }
  };

  const deleteUser = async (id) => {
    const res = await fetch(`/api/admin/users/${id}`, {
      method: "DELETE",
      headers: { "Content-Type": "application/json" },
    });

    if (res.ok) {
      toast.success("User deleted successfully");
      fetchUsers();
    } else {
      toast.error("Failed to delete user");
    }
  };

  useEffect(() => {
    fetchUsers();
  }, []);

  const filteredUsers = users.filter(user =>
    user.username.toLowerCase().includes(search.toLowerCase())
  );

  return (
    <div className="bg-gray-800 min-h-screen py-8 px-4 md:px-8">
      <h1 className="text-3xl md:text-4xl lg:text-5xl font-bold mb-6 text-center text-white">Admin Dashboard</h1>
      <input
        type="text"
        className="w-full md:w-1/2 lg:w-1/3 mx-auto px-4 py-2 border border-gray-300 rounded-lg shadow-md focus:outline-none focus:ring-2 focus:ring-blue-500 bg-gray-50 text-gray-800 mb-6"
        placeholder="Search by username"
        value={search}
        onChange={(e) => setSearch(e.target.value)}
      />
      <div className="overflow-x-auto">
        <table className="min-w-full bg-white rounded-lg shadow-md overflow-hidden">
          <thead className="bg-gray-200 text-gray-700">
            <tr>
              <th className="py-3 px-4 text-left text-xs font-medium uppercase tracking-wider">Username</th>
              <th className="py-3 px-4 text-left text-xs font-medium uppercase tracking-wider">Name</th>
              <th className="py-3 px-4 text-left text-xs font-medium uppercase tracking-wider">Email</th>
              <th className="py-3 px-4 text-left text-xs font-medium uppercase tracking-wider">Phone</th>
              <th className="py-3 px-4 text-left text-xs font-medium uppercase tracking-wider">Actions</th>
            </tr>
          </thead>
          <tbody className="text-gray-700">
            {filteredUsers.map((user) => (
              <tr key={user._id} className="border-b border-gray-200 last:border-none">
                <td className="py-4 px-4">{user.username}</td>
                <td className="py-4 px-4">{user.name}</td>
                <td className="py-4 px-4">{user.email}</td>
                <td className="py-4 px-4">{user.phone}</td>
                <td className="py-4 px-4">
                  <button
                    className="bg-red-600 hover:bg-red-800 text-white font-bold py-2 px-4 rounded-lg shadow-sm focus:outline-none focus:ring-2 focus:ring-red-500"
                    onClick={() => deleteUser(user._id)}
                  >
                    Delete
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default AdminDashboard;
