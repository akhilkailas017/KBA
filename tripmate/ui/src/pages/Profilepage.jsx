import React, { useState, useEffect } from 'react';
import { toast } from 'react-toastify';

const Profilepage = () => {
  const [profile, setProfile] = useState({
    username: '',
    name: '',
    gender: '',
    age: '',
    email: '',
    phone: ''
  });
  const [isEditing, setIsEditing] = useState(false);

  useEffect(() => {
    const fetchProfile = async () => {
      try {
        const response = await fetch('/api/profile', {
          credentials: 'include'
        });

        if (!response.ok) {
          const errorData = await response.json().catch(() => ({ msg: 'Error fetching profile' }));
          console.error('Error fetching profile:', errorData);
          toast.error(errorData.msg);
          return;
        }

        const data = await response.json();
        console.log('Fetched profile data:', data);
        setProfile(data);
      } catch (error) {
        console.error('Error fetching profile:', error);
        toast.error('Error fetching profile');
      }
    };

    fetchProfile();
  }, []);

  const handleChange = (e) => {
    setProfile({ ...profile, [e.target.name]: e.target.value });
  };

  const handleSave = async () => {
    try {
      const response = await fetch('/api/profile', {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json'
        },
        credentials: 'include',
        body: JSON.stringify(profile)
      });

      if (!response.ok) {
        const errorData = await response.json().catch(() => ({ msg: 'Error updating profile' }));
        console.error('Error updating profile:', errorData);
        toast.error(errorData.msg);
        return;
      }

      const result = await response.json();
      console.log('Update result:', result);
      toast.success('Profile updated successfully');
      setIsEditing(false);
    } catch (error) {
      console.error('Error updating profile:', error);
      toast.error('Error updating profile');
    }
  };

  return (
    <main className="flex flex-col justify-center items-center min-h-screen bg-gray-800 p-4">
      <div className="bg-gray-700 rounded-md shadow-md p-6 w-full max-w-lg">
        <h2 className="text-5xl font-bold text-white mb-6 text-center">Profile</h2>
        <div className="bg-gray-800 rounded-md shadow-md p-4 mb-6">
          <h3 className="text-xl font-bold text-white mb-4">Personal Details</h3>
          {Object.keys(profile).map((key) => (
            <div className="flex flex-col md:flex-row justify-between items-start md:items-center mb-4" key={key}>
              <span className="text-gray-300 capitalize md:w-1/3">{key}:</span>
              {isEditing ? (
                <input
                  type="text"
                  name={key}
                  value={profile[key]}
                  onChange={handleChange}
                  className="text-gray-800 w-full md:w-2/3 p-2 rounded-md bg-gray-200 focus:outline-none focus:ring-2 focus:ring-orange-400"
                />
              ) : (
                <span className="text-gray-300 font-bold md:w-2/3">{profile[key]}</span>
              )}
            </div>
          ))}
        </div>
        {isEditing ? (
          <button
            className="w-full py-3 bg-orange-500 hover:bg-orange-600 text-white font-bold rounded-lg shadow-lg transition ease-in-out duration-150"
            onClick={handleSave}
          >
            Save
          </button>
        ) : (
          <button
            className="w-full py-3 bg-orange-500 hover:bg-orange-600 text-white font-bold rounded-lg shadow-lg transition ease-in-out duration-150"
            onClick={() => setIsEditing(true)}
          >
            Edit Details
          </button>
        )}
      </div>
    </main>
  );
};

export default Profilepage;
