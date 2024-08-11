import React, { useState } from "react";

const ComplaintRegister = () => {
  const [complaintText, setComplaintText] = useState("");

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await fetch("/api/complaints", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        credentials: "include",
        body: JSON.stringify({ complaintText }),
      });

      if (response.ok) {
        alert("Complaint registered successfully");
        setComplaintText("");
      } else {
        alert("Failed to register complaint");
      }
    } catch (error) {
      console.error(error);
      alert("Failed to register complaint");
    }
  };

  return (
    <div className="flex justify-center items-center min-h-screen bg-gray-900 text-white">
      <div className="w-full max-w-lg mx-auto p-6 bg-gray-800 rounded-lg shadow-md">
        <h2 className="text-4xl font-bold mb-8 text-center text-white">
          Register Complaint
        </h2>
        <form onSubmit={handleSubmit} className="space-y-6">
          <textarea
            value={complaintText}
            onChange={(e) => setComplaintText(e.target.value)}
            placeholder="Enter your complaint"
            required
            className="w-full p-4 border border-gray-600 rounded-lg resize-none focus:outline-none focus:ring-2 focus:ring-orange-500 bg-gray-700 text-white"
            rows="6"
          />
          <button
            type="submit"
            className="w-full py-3 px-4 rounded-lg bg-orange-500 hover:bg-orange-700 focus:outline-none font-bold text-lg"
          >
            Submit
          </button>
        </form>
      </div>
    </div>
  );
};

export default ComplaintRegister;
