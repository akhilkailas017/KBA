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

  const filteredUsers = users.filter(user => user.username.toLowerCase().includes(search.toLowerCase()));

  return (
    <div className="w-full p-4 bg-gray-600 h-screen">
      <h1 className="text-2xl font-bold mb-4 text-center text-white">Admin Dashboard</h1>
      <input
        type="text"
        className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline mb-4"
        placeholder="Search by username"
        value={search}
        onChange={(e) => setSearch(e.target.value)}
      />
      <table className="min-w-full bg-white">
        <thead>
          <tr>
            <th className="py-2 px-4 border-b border-gray-200">Username</th>
            <th className="py-2 px-4 border-b border-gray-200">Name</th>
            <th className="py-2 px-4 border-b border-gray-200">Email</th>
            <th className="py-2 px-4 border-b border-gray-200">Phone</th>
            <th className="py-2 px-4 border-b border-gray-200">Actions</th>
          </tr>
        </thead>
        <tbody>
          {filteredUsers.map((user) => (
            <tr key={user._id}>
              <td className="py-2 px-4 border-b border-gray-200">{user.username}</td>
              <td className="py-2 px-4 border-b border-gray-200">{user.name}</td>
              <td className="py-2 px-4 border-b border-gray-200">{user.email}</td>
              <td className="py-2 px-4 border-b border-gray-200">{user.phone}</td>
              <td className="py-2 px-4 border-b border-gray-200">
                <button className="bg-red-500 hover:bg-red-700 text-white font-bold py-2 px-4 rounded" onClick={() => deleteUser(user._id)}>Delete</button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default AdminDashboard;
