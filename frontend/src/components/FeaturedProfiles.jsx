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
      try {
        const res = await fetchAllProfiles(token);
        setProfiles(res.data.profiles.slice(0, 10));
      } catch (error) {
        console.error('Error fetching profiles:', error);
      }
    };
    fetch();
  }, [token]);

  return (
    <section className="bg-pink-50 py-16 px-6">
      <h2 className="text-3xl font-extrabold text-center text-pink-700 mb-10">
        🌟 Featured Profiles
      </h2>

      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-8 max-w-7xl mx-auto">
        {profiles.map((profile) => (
          <div
            key={profile._id}
            className="bg-white rounded-2xl shadow-md p-5 hover:shadow-lg hover:scale-105 transition-all duration-300"
          >
            <div className="flex justify-center mb-4">
              <img
                src={profile.photos?.[0] || '/user.png'}
                alt={profile.fullName || 'User'}
                className="w-28 h-28 rounded-full object-cover border-4 border-pink-200"
              />
            </div>
            <h3 className="text-lg font-semibold text-center text-gray-800">
              {profile.fullName || 'Name Hidden'}, {profile.age}
            </h3>
            <p className="text-sm text-gray-500 text-center mb-3">
              {profile.location?.city || 'City'}, {profile.location?.country || 'Country'}
            </p>

            <div className="text-center">
              <Link to={`/profile/${profile._id}`}>
                <button className="mt-2 px-5 py-2 bg-pink-600 text-white rounded-full text-sm hover:bg-pink-700 transition">
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
