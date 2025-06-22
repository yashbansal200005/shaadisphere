


import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import axios from 'axios';
import { Bookmark, Heart } from 'lucide-react';
import { useAuth } from '../context/AuthContext'; // Get token from context


const PublicProfile = () => {
  const { id } = useParams();
  const [profile, setProfile] = useState(null);
  const [loading, setLoading] = useState(true);
  const [bookmarked, setBookmarked] = useState(false);
  const [interestSent, setInterestSent] = useState(false);
  const { token } = useAuth();


  useEffect(() => {
    // const fetchProfile = async () => {
    //   try {
    //     const res = await axios.get(`${import.meta.env.VITE_BACKEND_URL}/api/profile/${id}`);
    //     if (res.data.success) setProfile(res.data.profile);
    //   } catch (err) {
    //     console.error('Error loading profile:', err.message);
    //   } finally {
    //     setLoading(false);
    //   }
    // };
    const fetchProfile = async () => {
  try {
    const res = await axios.get(`${import.meta.env.VITE_BACKEND_URL}/api/profile/${id}`, {
      headers: token ? { Authorization: `Bearer ${token}` } : {},
    });

    if (res.data.success) {
      setProfile(res.data.profile);
      setBookmarked(res.data.bookmarked); // New: set initial bookmark state
    }
  } catch (err) {
    console.error('Error loading profile:', err.message);
  } finally {
    setLoading(false);
  }
};
    fetchProfile();
  }, [id]);

  const handleBookmark = async () => {
    if (!token) {
        alert("Please login to bookmark profiles.");
        return;
      }

  try {
    if (bookmarked) {
      await axios.delete(`${import.meta.env.VITE_BACKEND_URL}/api/bookmark/remove/${id}`, {
        headers: { Authorization: `Bearer ${token}` },
      });
    } else {
      await axios.post(`${import.meta.env.VITE_BACKEND_URL}/api/bookmark/add/${id}`, {}, {
        headers: { Authorization: `Bearer ${token}` },
      });
    }
    setBookmarked(!bookmarked);
  } catch (error) {
    console.error('Bookmark error:', error.message);
  }
};

  const handleInterest = () => {
    setInterestSent(true);
    // Optional: Send to backend here
  };

  if (loading) return <p className="text-center mt-20">Loading...</p>;
  if (!profile) return <p className="text-center mt-20">Profile not found</p>;

  return (
    <div className="max-w-4xl mx-auto mt-24 p-6 bg-white rounded-lg shadow-lg">
      <div className="flex justify-between items-center mb-6">
        <h2 className="text-3xl font-bold text-pink-700">{profile.fullName}</h2>
        <div className="flex gap-3">
          <button
            onClick={handleBookmark}
            className={`flex items-center gap-2 px-3 py-1 border rounded ${bookmarked ? 'bg-green-100 text-green-700' : 'hover:bg-gray-100'}`}
          >
            <Bookmark size={18} /> {bookmarked ? 'Bookmarked' : 'Bookmark'}
          </button>
          <button
            onClick={handleInterest}
            disabled={interestSent}
            className={`flex items-center gap-2 px-3 py-1 rounded ${interestSent ? 'bg-gray-300' : 'bg-pink-600 text-white hover:bg-pink-700'}`}
          >
            <Heart size={18} /> {interestSent ? 'Interest Sent' : 'Send Interest'}
          </button>
        </div>
      </div>

      <img
        src={profile.photos?.[0] || '/user.png'}
        alt="Profile"
        className="w-full h-64 object-contain rounded-lg mb-6"
      />

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6 text-gray-800">
        <div>
          <h3 className="font-semibold text-lg mb-2">Basic Information</h3>
          <p><strong>Age:</strong> {profile.age}</p>
          <p><strong>Gender:</strong> {profile.gender}</p>
          <p><strong>Religion:</strong> {profile.religion}</p>
          <p><strong>Caste:</strong> {profile.caste}</p>
          <p><strong>Location:</strong> {profile.location?.city}, {profile.location?.country}</p>
        </div>
        <div>
          <h3 className="font-semibold text-lg mb-2">Professional Info</h3>
          <p><strong>Education:</strong> {profile.education}</p>
          <p><strong>Occupation:</strong> {profile.occupation}</p>
          <p><strong>Income:</strong> {profile.income}</p>
        </div>

        <div>
          <h3 className="font-semibold text-lg mb-2">Lifestyle</h3>
          <p><strong>Hobbies:</strong> {profile.hobbies}</p>
          <p><strong>Interests:</strong> {profile.interests}</p>
          <p><strong>Smoking:</strong> {profile.habits?.smoking ? 'Yes' : 'No'}</p>
          <p><strong>Drinking:</strong> {profile.habits?.drinking ? 'Yes' : 'No'}</p>
        </div>
        <div>
          <h3 className="font-semibold text-lg mb-2">Family Details</h3>
          <p><strong>Father:</strong> {profile.familyDetails?.father}</p>
          <p><strong>Mother:</strong> {profile.familyDetails?.mother}</p>
          <p><strong>Siblings:</strong> {profile.familyDetails?.siblings}</p>
          <p><strong>Family Type:</strong> {profile.familyDetails?.familyType}</p>
        </div>

        <div className="md:col-span-2">
          <h3 className="font-semibold text-lg mb-2">Partner Preferences</h3>
          <p><strong>Age:</strong> {profile.partnerPreferences?.minAge} - {profile.partnerPreferences?.maxAge}</p>
          <p><strong>Religion:</strong> {profile.partnerPreferences?.religion}</p>
          <p><strong>Caste:</strong> {profile.partnerPreferences?.caste}</p>
          <p><strong>Education:</strong> {profile.partnerPreferences?.education}</p>
          <p><strong>Occupation:</strong> {profile.partnerPreferences?.occupation}</p>
          <p><strong>Preferred Location:</strong> {profile.partnerPreferences?.location}</p>
        </div>
      </div>
    </div>
  );
};

export default PublicProfile;

