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
      setBookmarks((prev) => prev.filter((p) => p._id !== profileId));
    } catch (error) {
      console.error('Error removing bookmark:', error.message);
    }
  };

  useEffect(() => {
    if (token) {
      fetchBookmarks();
    }
  }, [token]);

  return (
    <div className="mt-24 px-6 max-w-7xl mx-auto">
      <h2 className="text-3xl font-bold text-pink-600 mb-8 text-center">💖 Bookmarked Profiles</h2>

      {loading ? (
        <p className="text-center text-gray-500">Loading your favorites...</p>
      ) : bookmarks.length === 0 ? (
        <p className="text-center text-gray-400 italic">You haven't bookmarked any profiles yet.</p>
      ) : (
        <div className="grid gap-6 grid-cols-1 sm:grid-cols-2 lg:grid-cols-3">
          {bookmarks.map((profile) => (
            <div
              key={profile._id}
              className="relative bg-white rounded-xl shadow-md hover:shadow-lg transition-transform hover:scale-[1.02] p-5"
            >
              <button
                onClick={() => handleRemoveBookmark(profile._id)}
                className="absolute top-2 right-2 text-gray-400 hover:text-red-600"
                title="Remove from bookmarks"
              >
                <X size={20} />
              </button>

              <img
                src={profile.photos?.[0] || '/user.png'}
                alt="Profile"
                className="w-full h-52 object-cover object-center rounded-lg mb-4"
              />

              <h3 className="text-xl font-semibold text-gray-800 mb-1">
                {profile.fullName || 'Name Hidden'}, {profile.age}
              </h3>
              <p className="text-sm text-gray-600">Religion: {profile.religion}</p>
              <p className="text-sm text-gray-600 mb-2">
                Location: {profile.location?.city}, {profile.location?.country}
              </p>

              <button
                onClick={() => navigate(`/profile/${profile._id}`)}
                className="mt-2 w-full bg-pink-600 text-white py-2 rounded hover:bg-pink-700 transition"
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
