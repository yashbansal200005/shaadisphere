import React, { useState, useEffect } from 'react';
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
  const [existingImage, setExistingImage] = useState('');
  const navigate = useNavigate();

  const handleChange = (e) => {
    const { name, value, type, checked } = e.target;
    if (name.includes('.')) {
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
        alert('Profile updated successfully!');
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
          headers: { Authorization: `Bearer ${token}` }
        });

        if (res.data.success && res.data.profile) {
          setFormData((prev) => ({
            ...prev,
            ...res.data.profile
          }));
          const profile = res.data.profile;
          if (profile.photos?.length > 0) {
            setExistingImage(profile.photos[0]);
          }
        }
      } catch (error) {
        console.error('Error loading profile:', error.message);
      }
    };

    fetchProfile();
  }, []);

  return (
    <div className="max-w-4xl mx-auto p-6 mt-24">
      <h2 className="text-3xl font-bold text-pink-600 mb-6 text-center">Update Your Profile</h2>
      <form onSubmit={handleSubmit} className="space-y-6" encType="multipart/form-data">
        {/* Current Image Preview */}
        {existingImage && (
          <div className="text-center mb-6">
            <p className="text-sm text-gray-600 mb-2">Current Profile Photo</p>
            <img src={existingImage} alt="Profile" className="mx-auto w-40 h-40 rounded-full object-cover shadow-md" />
          </div>
        )}

        {/* Personal Details */}
        <section>
          <h3 className="text-xl font-semibold text-gray-700 mb-3">Personal Information</h3>
          <div className="grid md:grid-cols-2 gap-4">
            <input type="text" name="fullName" value={formData.fullName} onChange={handleChange} placeholder="Full Name" className="input" />
            <input type="number" name="age" value={formData.age} onChange={handleChange} placeholder="Age" className="input" />
            <select name="gender" value={formData.gender} onChange={handleChange} className="input">
              <option value="">Gender</option>
              <option>Male</option>
              <option>Female</option>
              <option>Other</option>
            </select>
            <input type="text" name="religion" value={formData.religion} onChange={handleChange} placeholder="Religion" className="input" />
            <input type="text" name="caste" value={formData.caste} onChange={handleChange} placeholder="Caste" className="input" />
            <input type="text" name="motherTongue" value={formData.motherTongue} onChange={handleChange} placeholder="Mother Tongue" className="input" />
            <input type="text" name="location.city" value={formData.location.city} onChange={handleChange} placeholder="City" className="input" />
            <input type="text" name="location.country" value={formData.location.country} onChange={handleChange} placeholder="Country" className="input" />
          </div>
        </section>

        {/* Professional */}
        <section>
          <h3 className="text-xl font-semibold text-gray-700 mb-3">Professional Details</h3>
          <div className="grid md:grid-cols-2 gap-4">
            <input type="text" name="education" value={formData.education} onChange={handleChange} placeholder="Education" className="input" />
            <input type="text" name="occupation" value={formData.occupation} onChange={handleChange} placeholder="Occupation" className="input" />
            <input type="text" name="income" value={formData.income} onChange={handleChange} placeholder="Income" className="input" />
          </div>
        </section>

        {/* Family */}
        <section>
          <h3 className="text-xl font-semibold text-gray-700 mb-3">Family Details</h3>
          <div className="grid md:grid-cols-2 gap-4">
            <input type="text" name="familyDetails.father" value={formData.familyDetails.father} onChange={handleChange} placeholder="Father's Name" className="input" />
            <input type="text" name="familyDetails.mother" value={formData.familyDetails.mother} onChange={handleChange} placeholder="Mother's Name" className="input" />
            <input type="number" name="familyDetails.siblings" value={formData.familyDetails.siblings} onChange={handleChange} placeholder="Siblings" className="input" />
            <select name="familyDetails.familyType" value={formData.familyDetails.familyType} onChange={handleChange} className="input">
              <option value="">Family Type</option>
              <option value="Nuclear">Nuclear</option>
              <option value="Joint">Joint</option>
            </select>
          </div>
        </section>

        {/* Lifestyle */}
        <section>
          <h3 className="text-xl font-semibold text-gray-700 mb-3">Lifestyle & Interests</h3>
          <div className="flex items-center gap-6">
            <label className="flex items-center gap-2">
              <input type="checkbox" name="habits.smoking" checked={formData.habits.smoking} onChange={handleChange} />
              <span>Smoking</span>
            </label>
            <label className="flex items-center gap-2">
              <input type="checkbox" name="habits.drinking" checked={formData.habits.drinking} onChange={handleChange} />
              <span>Drinking</span>
            </label>
          </div>
          <input type="text" name="hobbies" value={formData.hobbies} onChange={handleChange} placeholder="Hobbies (comma separated)" className="input mt-2 my-1" />
          
          <input type="text" name="interests" value={formData.interests} onChange={handleChange} placeholder="Interests (comma separated)" className="input" />
        </section>

        {/* Partner Preferences */}
        <section>
          <h3 className="text-xl font-semibold text-gray-700 mb-3">Partner Preferences</h3>
          <div className="grid md:grid-cols-2 gap-4">
            <input type="number" name="partnerPreferences.minAge" value={formData.partnerPreferences.minAge} onChange={handleChange} placeholder="Min Age" className="input" />
            <input type="number" name="partnerPreferences.maxAge" value={formData.partnerPreferences.maxAge} onChange={handleChange} placeholder="Max Age" className="input" />
            <input type="text" name="partnerPreferences.religion" value={formData.partnerPreferences.religion} onChange={handleChange} placeholder="Preferred Religion" className="input" />
            <input type="text" name="partnerPreferences.caste" value={formData.partnerPreferences.caste} onChange={handleChange} placeholder="Preferred Caste" className="input" />
            <input type="text" name="partnerPreferences.education" value={formData.partnerPreferences.education} onChange={handleChange} placeholder="Preferred Education" className="input" />
            <input type="text" name="partnerPreferences.occupation" value={formData.partnerPreferences.occupation} onChange={handleChange} placeholder="Preferred Occupation" className="input" />
            <input type="text" name="partnerPreferences.location" value={formData.partnerPreferences.location} onChange={handleChange} placeholder="Preferred Location" className="input" />
          </div>
        </section>

        {/* Photos */}
        <section>
          <h3 className="text-xl font-semibold text-gray-700 mb-3">Upload Profile Photos</h3>
          <input type="file" onChange={handleImageChange} multiple accept="image/*" className="mt-2" />
          
        </section>

        {/* Submit */}
        <button type="submit" className="w-full bg-pink-600 text-white py-3 rounded hover:bg-pink-700 transition">
          Save Profile
        </button>
      </form>
    </div>
  );
};

export default ProfileUpdate;
