import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { useAuth } from '../context/AuthContext';
import { useNavigate } from 'react-router-dom';
import { X } from 'lucide-react';

const MyBookmark = () => {
 
  const { token } = useAuth();
  
  const [bookmarks, setBookmarks] = useState([]);
  const [loading, setLoading] = useState(true);
  const navigate = useNavigate();

  const fetchBookmarks = async () => {
    try {
      const res = await axios.get(`${import.meta.env.VITE_BACKEND_URL}/api/bookmark/my`, {
        headers: { Authorization: `Bearer ${token}` },
      });
      if (res.data.success) setBookmarks(res.data.bookmarks);
    } catch (error) {
      console.error('Error fetching bookmarks:', error.message);
    } finally {
      setLoading(false);
    }
  };

  const handleRemoveBookmark = async (profileId) => {
    try {
      await axios.delete(`${import.meta.env.VITE_BACKEND_URL}/api/bookmark/remove/${profileId}`, {
        headers: { Authorization: `Bearer ${token}` },
      });
      setBookmarks(prev => prev.filter(p => p._id !== profileId));
    } catch (error) {
      console.error('Error removing bookmark:', error.message);
    }
  };

    useEffect(() => {
    //   console.log("Loaded token in MyBookmarks.jsx:", token);
    if (token) {
        fetchBookmarks();
    }
    }, [token]);

  return (
    <div className="mt-24 px-6">
      <h2 className="text-2xl font-bold mb-6 text-pink-700">Bookmarked Profiles</h2>

      {loading ? (
        <p className="text-center text-gray-500">Loading...</p>
      ) : bookmarks.length === 0 ? (
        <p className="text-center text-gray-500">No bookmarked profiles yet.</p>
      ) : (
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {bookmarks.map((profile) => (
            <div key={profile._id} className="bg-white p-4 shadow-md rounded-md relative">
              <button
                onClick={() => handleRemoveBookmark(profile._id)}
                className="absolute top-2 right-2 text-gray-400 hover:text-red-600"
              >
                <X size={18} />
              </button>
              <img
                src={profile.photos?.[0] || '/user.png'}
                alt="Profile"
                className="w-full h-48 object-contain rounded-md mb-3"
              />
              <h3 className="text-lg font-bold">{profile.fullName || 'Name Hidden'}</h3>
              <p className="text-gray-600">Age: {profile.age}</p>
              <p className="text-gray-600">Religion: {profile.religion}</p>
              <p className="text-gray-600">
                Location: {profile.location?.city}, {profile.location?.country}
              </p>
              <button
                className="mt-2 text-sm text-pink-600 hover:underline"
                onClick={() => navigate(`/profile/${profile._id}`)}
              >
                View Profile
              </button>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default MyBookmark;
