import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { Link } from 'react-router-dom';
import { useAuth } from '../context/AuthContext'; 
const defaultFilters = {
  minAge: '',
  maxAge: '',
  religion: '',
  caste: '',
  gender: '',
  city: '',
  country: '',
  education: '',
  occupation: ''
};

const SearchPage = () => {
  const [filters, setFilters] = useState(defaultFilters);
  const [profiles, setProfiles] = useState([]);
  const [loading, setLoading] = useState(false);
  const { token } = useAuth();


  const handleChange = (e) => {
    const { name, value } = e.target;
    setFilters((prev) => ({ ...prev, [name]: value }));
  };

  const fetchAllProfiles = async () => {
    setLoading(true);
    try {
      const res = await axios.get(`${import.meta.env.VITE_BACKEND_URL}/api/profile/all`, {
  headers: { Authorization: `Bearer ${token}` }
});
      if (res.data.success) {
        setProfiles(res.data.profiles);
      }
    } catch (err) {
      console.error('Error fetching all profiles:', err.message);
    } finally {
      setLoading(false);
    }
  };

  const fetchFilteredProfiles = async () => {
    setLoading(true);
    try {
      const params = new URLSearchParams();
      for (const key in filters) {
        if (filters[key]) params.append(key, filters[key]);
      }

      const res = await axios.get(`${import.meta.env.VITE_BACKEND_URL}/api/search?${params.toString()}`);
      if (res.data.success) {
        setProfiles(res.data.results);
      }
    } catch (err) {
      console.error('Error fetching filtered profiles:', err.message);
    } finally {
      setLoading(false);
    }
  };

  const handleSearch = () => {
    fetchFilteredProfiles();
  };

  const handleReset = () => {
    setFilters(defaultFilters);
    fetchAllProfiles();
  };

  useEffect(() => {
    fetchAllProfiles();
  }, []);

  return (
    <div className="mt-24 px-6 md:flex gap-8">
      {/* Filters Sidebar */}
      <div className="w-full md:w-1/4 bg-white shadow-md p-4 rounded-md">
        <h2 className="text-lg font-semibold mb-4">Search Filters</h2>
        <div className="space-y-3">
          <input name="minAge" type="number" placeholder="Min Age" value={filters.minAge} onChange={handleChange} className="input" min="0" />
          <input name="maxAge" type="number" placeholder="Max Age" value={filters.maxAge} onChange={handleChange} className="input" min="0"/>
          <input name="religion" placeholder="Religion" value={filters.religion} onChange={handleChange} className="input" />
          <input name="caste" placeholder="Caste" value={filters.caste} onChange={handleChange} className="input" />
          <select name="gender" value={filters.gender} onChange={handleChange} className="input">
            <option value="">Select Gender</option>
            <option>Male</option>
            <option>Female</option>
            <option>Other</option>
          </select>
          <input name="city" placeholder="City" value={filters.city} onChange={handleChange} className="input" />
          <input name="country" placeholder="Country" value={filters.country} onChange={handleChange} className="input" />
          <input name="education" placeholder="Education" value={filters.education} onChange={handleChange} className="input" />
          <input name="occupation" placeholder="Occupation" value={filters.occupation} onChange={handleChange} className="input" />

          <div className="flex justify-between mt-4">
            <button onClick={handleReset} className="bg-gray-200 px-4 py-2 rounded">Reset</button>
            <button onClick={handleSearch} className="bg-pink-600 text-white px-4 py-2 rounded hover:bg-pink-700">Apply</button>
          </div>
        </div>
      </div>

      {/* Results */}
      <div className="w-full md:w-3/4 mt-6 md:mt-0">
        {loading ? (
          <p className="text-center text-gray-500">Loading...</p>
        ) : profiles.length === 0 ? (
          <p className="text-center text-gray-500">No profiles found.</p>
        ) : (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {profiles.map((profile) => (
              <div key={profile._id} className="bg-white p-4 shadow-md rounded-md">
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
                <Link to={`/profile/${profile._id}`}>
                  <button className="mt-2 text-sm text-pink-600 hover:underline">View Profile</button>
                </Link>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
};

export default SearchPage;
