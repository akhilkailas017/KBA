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
    <main className="flex flex-col justify-center items-center h-screen bg-gray-600">
      <div className="bg-white rounded-md shadow-md p-10 w-1/2">
        <h2 className="text-3xl font-bold mb-4">Profile</h2>
        <div className="flex flex-col justify-center items-center">
          <div className="bg-white rounded-md shadow-md p-4 w-full mb-4">
            <h3 className="text-2xl font-bold mb-2">Personal Details</h3>
            {Object.keys(profile).map((key) => (
              <div className="flex flex-row justify-between mb-2" key={key}>
                <span className="text-gray-700 capitalize">{key}:</span>
                {isEditing ? (
                  <input
                    type="text"
                    name={key}
                    value={profile[key]}
                    onChange={handleChange}
                    className="text-gray-700 font-bold"
                  />
                ) : (
                  <span className="text-gray-700 font-bold">{profile[key]}</span>
                )}
              </div>
            ))}
          </div>
          {isEditing ? (
            <button className="bg-orange-500 hover:bg-orange-700 text-white font-bold py-2 px-4 rounded" onClick={handleSave}>
              Save
            </button>
          ) : (
            <button className="bg-orange-500 hover:bg-orange-700 text-white font-bold py-2 px-4 rounded" onClick={() => setIsEditing(true)}>
              Edit Details
            </button>
          )}
        </div>
      </div>
    </main>
  );
};

export default Profilepage;
