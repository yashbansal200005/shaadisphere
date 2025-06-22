import React, { useState,useEffect } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';

const ProfileUpdate = () => {
  const [formData, setFormData] = useState({
    fullName: '',
    age: '',
    gender: '',
    religion: '',
    caste: '',
    motherTongue: '',
    location: { city: '', country: '' },
    education: '',
    occupation: '',
    income: '',
    familyDetails: {
      father: '',
      mother: '',
      siblings: '',
      familyType: ''
    },
    habits: {
      drinking: false,
      smoking: false
    },
    hobbies: '',
    interests: '',
    partnerPreferences: {
      minAge: '',
      maxAge: '',
      religion: '',
      caste: '',
      education: '',
      occupation: '',
      location: ''
    },
    photos: []
  });

  const [images, setImages] = useState([]);
  const navigate = useNavigate();
  const [existingImage, setExistingImage] = useState('');


  const handleChange = (e) => {
    const { name, value, type, checked } = e.target;

    if (name.includes('location.') || name.includes('familyDetails.') || name.includes('partnerPreferences.') || name.includes('habits.')) {
      const [section, key] = name.split('.');
      setFormData((prev) => ({
        ...prev,
        [section]: {
          ...prev[section],
          [key]: type === 'checkbox' ? checked : value
        }
      }));
    } else {
      setFormData((prev) => ({
        ...prev,
        [name]: type === 'checkbox' ? checked : value
      }));
    }
  };

  const handleImageChange = (e) => {
    const files = Array.from(e.target.files);
    setImages(files.slice(0, 4));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const token = localStorage.getItem('token');
    const form = new FormData();

    for (const key in formData) {
      if (typeof formData[key] === 'object' && !Array.isArray(formData[key])) {
        for (const subKey in formData[key]) {
          form.append(`${key}.${subKey}`, formData[key][subKey]);
        }
      } else {
        form.append(key, formData[key]);
      }
    }

    images.forEach((file, index) => {
      form.append(`image${index + 1}`, file);
    });

    try {
      const res = await axios.post(`${import.meta.env.VITE_BACKEND_URL}/api/profile/save`, form, {
        headers: {
          'Content-Type': 'multipart/form-data',
          Authorization: `Bearer ${token}`
        }
      });

      if (res.data.success) {
        alert('Profile saved successfully!');
        navigate('/');
      } else {
        alert(res.data.message || 'Something went wrong.');
      }
    } catch (err) {
      console.error(err);
      alert('Server error.');
    }
  };


  useEffect(() => {
  const fetchProfile = async () => {
    const token = localStorage.getItem('token');
    try {
      const res = await axios.get(`${import.meta.env.VITE_BACKEND_URL}/api/profile/me`, {
        headers: {
          Authorization: `Bearer ${token}`
        }
      });

      if (res.data.success && res.data.profile) {
        setFormData((prev) => ({
          ...prev,
          ...res.data.profile
        }));
        const profile = res.data.profile;
         if (profile.photos && profile.photos.length > 0) {
    setExistingImage(profile.photos[0]); // First image only
  }
      }
    } catch (error) {
      console.error('Error loading profile:', error.message);
      // Profile might not exist yet — that's okay
    }
  };

  fetchProfile();
}, []);





  return (
  <div className="max-w-4xl mx-auto p-6 mt-24">
    <h2 className="text-2xl font-bold mb-6">Update Your Profile</h2>
    <form onSubmit={handleSubmit} className="space-y-4" encType="multipart/form-data">
      {/* Personal Info */}
      {existingImage && (
  <div className="mt-2">
    <p className="text-sm text-gray-600 mb-1">Current Profile Photo:</p>
    <img
      src={existingImage}
      alt="Current profile"
      className="w-48 h-48 object-cover rounded-md shadow"
    />
  </div>
)}

      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        <input type="text" name="fullName" value={formData.fullName} placeholder="Full Name" onChange={handleChange} className="input" />
        <input type="number" name="age" value={formData.age} placeholder="Age" onChange={handleChange} className="input" min="0"/>
        <select name="gender" value={formData.gender} onChange={handleChange} className="input">
          <option value="">Select Gender</option>
          <option>Male</option>
          <option>Female</option>
          <option>Other</option>
        </select>
        <input type="text" name="religion" value={formData.religion} placeholder="Religion" onChange={handleChange} className="input" />
        <input type="text" name="caste" value={formData.caste} placeholder="Caste" onChange={handleChange} className="input" />
        <input type="text" name="motherTongue" value={formData.motherTongue} placeholder="Mother Tongue" onChange={handleChange} className="input" />
        <input type="text" name="location.city" value={formData.location.city} placeholder="City" onChange={handleChange} className="input" />
        <input type="text" name="location.country" value={formData.location.country} placeholder="Country" onChange={handleChange} className="input" />
      </div>

      {/* Professional Info */}
      <h3 className="font-semibold mt-6">Professional Information</h3>
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        <input type="text" name="education" value={formData.education} placeholder="Education" onChange={handleChange} className="input" />
        <input type="text" name="occupation" value={formData.occupation} placeholder="Occupation" onChange={handleChange} className="input" />
        <input type="text" name="income" value={formData.income} placeholder="Income" onChange={handleChange} className="input" min="0"/>
      </div>

      {/* Family Info */}
      <h3 className="font-semibold mt-6">Family Details</h3>
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        <input type="text" name="familyDetails.father" value={formData.familyDetails.father} placeholder="Father's Name" onChange={handleChange} className="input" />
        <input type="text" name="familyDetails.mother" value={formData.familyDetails.mother} placeholder="Mother's Name" onChange={handleChange} className="input" />
        <input type="number" name="familyDetails.siblings" value={formData.familyDetails.siblings} placeholder="No. of Siblings" onChange={handleChange} className="input" min="0" />
        <select name="familyDetails.familyType" value={formData.familyDetails.familyType} onChange={handleChange} className="input">
          <option value="">Family Type</option>
          <option value="Nuclear">Nuclear</option>
          <option value="Joint">Joint</option>
        </select>
      </div>

      {/* Lifestyle & Interests */}
      <h3 className="font-semibold mt-6">Lifestyle & Interests</h3>
      <div className="flex space-x-4 items-center">
        <label className="flex items-center space-x-2">
          <input type="checkbox" name="habits.smoking" checked={formData.habits.smoking} onChange={handleChange} />
          <span>Smoking</span>
        </label>
        <label className="flex items-center space-x-2">
          <input type="checkbox" name="habits.drinking" checked={formData.habits.drinking} onChange={handleChange} />
          <span>Drinking</span>
        </label>
      </div>
      <input type="text" name="hobbies" value={formData.hobbies} placeholder="Hobbies (comma separated)" onChange={handleChange} className="input mt-2" />
      <input type="text" name="interests" value={formData.interests} placeholder="Interests (comma separated)" onChange={handleChange} className="input" />

      {/* Partner Preferences */}
      <h3 className="font-semibold mt-6">Partner Preferences</h3>
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        <input type="number" name="partnerPreferences.minAge" value={formData.partnerPreferences.minAge} placeholder="Min Age" onChange={handleChange} className="input" min="0"/>
        <input type="number" name="partnerPreferences.maxAge" value={formData.partnerPreferences.maxAge} placeholder="Max Age" onChange={handleChange} className="input" min="0"/>
        <input type="text" name="partnerPreferences.religion" value={formData.partnerPreferences.religion} placeholder="Religion" onChange={handleChange} className="input" />
        <input type="text" name="partnerPreferences.caste" value={formData.partnerPreferences.caste} placeholder="Caste" onChange={handleChange} className="input" />
        <input type="text" name="partnerPreferences.education" value={formData.partnerPreferences.education} placeholder="Education" onChange={handleChange} className="input" />
        <input type="text" name="partnerPreferences.occupation" value={formData.partnerPreferences.occupation} placeholder="Occupation" onChange={handleChange} className="input" />
        <input type="text" name="partnerPreferences.location" value={formData.partnerPreferences.location} placeholder="Preferred Location" onChange={handleChange} className="input" />
      </div>

      {/* Upload Images */}
      <h3 className="font-semibold mt-6">Profile Photos</h3>
      <input type="file" name="photos" onChange={handleImageChange} multiple accept="image/*" className="mt-2" />

      {/* Submit */}
      <button type="submit" className="mt-6 w-full bg-pink-600 text-white py-2 rounded hover:bg-pink-700">
        Save Profile
      </button>
    </form>
  </div>
);

};

export default ProfileUpdate;
