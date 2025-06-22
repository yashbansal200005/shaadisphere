import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import axios from 'axios';
import { useAuth } from '../context/AuthContext';
 
const FeaturedProfiles = () => {
  const [profiles, setProfiles] = useState([]);
  const { token } = useAuth();


const fetchAllProfiles = async (token = null) => {
  const headers = token ? { Authorization: `Bearer ${token}` } : {};
  return axios.get(`${import.meta.env.VITE_BACKEND_URL}/api/profile/all`, { headers });
};

useEffect(() => {
  const fetch = async () => {
    const res = await fetchAllProfiles(token);
    setProfiles(res.data.profiles.slice(0, 10));
  };
  fetch();
}, [token]);



  return (
    <section className="bg-white py-12 px-4">
      <h2 className="text-2xl font-semibold text-center text-gray-800 mb-8">
        🌟 Featured Profiles
      </h2>

      <div className="flex space-x-6 overflow-x-auto scrollbar-hide px-2 md:px-6">
        {profiles.map((profile) => (
          <div
            key={profile._id}
            className="min-w-[250px] bg-pink-50 rounded-xl shadow-md p-4 flex-shrink-0 hover:shadow-lg transition hover:scale-105"
          >
            <img
              src={profile.photos?.[0] || '/user.png'}
              alt={profile.fullName || 'User'}
              className="w-32 h-32 rounded-full mx-auto object-contain bg-gray-100 mb-4"
            />
            <h3 className="text-lg font-bold text-center text-gray-800">
              {profile.fullName || 'Name Hidden'}, {profile.age}
            </h3>
            <p className="text-sm text-gray-600 text-center">
              {profile.location?.city}, {profile.location?.country}
            </p>
           
            <div className="text-center mt-4">
              <Link to={`/profile/${profile._id}`}>
                <button className="mt-2 px-4 py-1 bg-pink-600 text-white rounded hover:bg-pink-700">
                  View Profile
                </button>
              </Link>
            </div>
          </div>
        ))}
      </div>
    </section>
  );
};

export default FeaturedProfiles;
