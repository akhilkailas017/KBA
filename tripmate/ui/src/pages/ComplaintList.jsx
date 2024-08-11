import React, { useState, useEffect } from "react";

const ComplaintList = () => {
  const [complaints, setComplaints] = useState([]);

  useEffect(() => {
    const fetchComplaints = async () => {
      try {
        const response = await fetch("/api/admin/complaints", {
          credentials: "include",
        });

        if (response.ok) {
          const data = await response.json();
          setComplaints(data);
        } else {
          console.error("Failed to fetch complaints");
        }
      } catch (error) {
        console.error(error);
      }
    };
    fetchComplaints();
  }, []);

  const handleDelete = async (id) => {
    try {
      const response = await fetch(`/api/admin/complaints/${id}`, {
        method: "DELETE",
        credentials: "include",
      });

      if (response.ok) {
        setComplaints(complaints.filter((complaint) => complaint._id !== id));
      } else {
        alert("Failed to delete complaint");
      }
    } catch (error) {
      console.error(error);
      alert("Failed to delete complaint");
    }
  };

  return (
    <div className="bg-gray-800 min-h-screen py-8 px-4 md:px-8">
      <h2 className="text-3xl md:text-4xl lg:text-5xl text-center text-white font-bold mb-6">Complaints</h2>
      <div className="bg-white shadow-lg rounded-lg overflow-hidden mx-auto max-w-3xl md:max-w-4xl">
        <ul className="divide-y divide-gray-300">
          {complaints.map((complaint) => (
            <li key={complaint._id} className="p-4 flex flex-col md:flex-row md:items-start border-b border-gray-300">
              <div className="flex flex-col md:flex-row md:justify-between w-full">
                <div className="mb-4 md:mb-0">
                  <p className="text-lg font-semibold text-gray-800">{complaint.userId.name}</p>
                  <p className="text-gray-500">{complaint.userId.username}</p>
                </div>
                <div className="flex flex-col md:items-end w-full">
                  <p className="text-sm text-gray-700 mb-2">
                    <strong>Complaint:</strong> {complaint.complaintText}
                  </p>
                  <p className="text-xs text-gray-500">
                    <strong>Date:</strong> {new Date(complaint.createdAt).toLocaleDateString()}
                  </p>
                </div>
              </div>
              <button
                onClick={() => handleDelete(complaint._id)}
                className="mt-4 md:mt-0 md:ml-4 bg-red-600 text-white px-4 py-2 rounded-lg hover:bg-red-700 focus:outline-none focus:ring-2 focus:ring-red-500"
              >
                Delete
              </button>
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
};

export default ComplaintList;
