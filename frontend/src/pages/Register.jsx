import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';

const Register = () => {
  const [form, setForm] = useState({ email: '', phone: '', password: '' });
  const [error, setError] = useState('');
  const navigate = useNavigate();

  const handleChange = (e) => setForm({ ...form, [e.target.name]: e.target.value });

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const res = await axios.post(`${import.meta.env.VITE_BACKEND_URL}/api/auth/register`, form);
      if (res.data.token) {
        localStorage.setItem('token', res.data.token);
        navigate('/');
      } else {
        setError(res.data.message || 'Registration failed');
      }
    } catch (err) {
      setError(err.response?.data?.message || 'Server error');
    }
  };

  return (
    <div className="min-h-screen flex justify-center items-center bg-gray-50 pt-20">
      <form onSubmit={handleSubmit} className="bg-white p-8 rounded shadow-md w-full max-w-md">
        <h2 className="text-2xl font-bold mb-6 text-pink-600 text-center">Register</h2>
        {error && <p className="text-red-500 text-sm mb-4 text-center">{error}</p>}
        
        <div className="space-y-4">
          <input
            type="email"
            name="email"
            placeholder="Email"
            className="w-full px-4 py-2 border rounded focus:outline-none focus:ring-2 focus:ring-pink-400"
            value={form.email}
            onChange={handleChange}
            required
          />
          <input
            type="text"
            name="phone"
            placeholder="Phone"
            className="w-full px-4 py-2 border rounded focus:outline-none focus:ring-2 focus:ring-pink-400"
            value={form.phone}
            onChange={handleChange}
          />
          <input
            type="password"
            name="password"
            placeholder="Password"
            className="w-full px-4 py-2 border rounded focus:outline-none focus:ring-2 focus:ring-pink-400"
            value={form.password}
            onChange={handleChange}
            required
          />
        </div>

        <button
          type="submit"
          className="w-full mt-6 bg-pink-600 text-white py-2 rounded hover:bg-pink-700 transition"
        >
          Register
        </button>
      </form>
    </div>
  );
};

export default Register;
