
import { useState } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import axios from 'axios';
import { useAuth } from '../context/AuthContext';
const Register = () => {
  const [form, setForm] = useState({ email: '', phone: '', password: '' });
  const [error, setError] = useState('');
  const navigate = useNavigate();
  const { login } = useAuth(); 
  const handleChange = (e) => {
    const { name, value } = e.target;
    setForm((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError('');
    try {
      const res = await axios.post(`${import.meta.env.VITE_BACKEND_URL}/api/auth/register`, form);
      if (res.data.token) {
        login(res.data.token);
        navigate('/');
      } else {
        setError(res.data.message || 'Registration failed');
      }
    } catch (err) {
      setError(err.response?.data?.message || 'Server error');
    }
  };

//   const handleLogin = async () => {
//   const res = await axios.post('/api/auth/login', { email, password });
//   if (res.data.token) {
//     login(res.data.token); // From AuthContext
//     navigate('/'); // Redirect if needed
//   }
// };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-pink-100 to-pink-200 px-4 pt-24">
      <div className="bg-white shadow-xl rounded-2xl p-8 w-full max-w-md">
        <h2 className="text-3xl font-bold text-center text-pink-600 mb-4">Create Your Account</h2>
        <p className="text-sm text-gray-500 text-center mb-6">Join ShaadiSphere and find your perfect match 💖</p>

        {error && (
          <div className="bg-red-100 border border-red-400 text-red-700 px-4 py-2 rounded mb-4 text-sm text-center">
            {error}
          </div>
        )}

        <form onSubmit={handleSubmit} className="space-y-5">
          <input
            type="email"
            name="email"
            placeholder="Email address"
            value={form.email}
            onChange={handleChange}
            className="w-full px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-pink-500"
            required
          />
          <input
            type="text"
            name="phone"
            placeholder="Phone number"
            value={form.phone}
            onChange={handleChange}
            className="w-full px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-pink-500"
          />
          <input
            type="password"
            name="password"
            placeholder="Create a password"
            value={form.password}
            onChange={handleChange}
            className="w-full px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-pink-500"
            required
          />
          <button
            type="submit"
            className="w-full bg-pink-600 text-white py-2 rounded-md hover:bg-pink-700 transition"
          >
            Register
          </button>
        </form>

        <p className="text-xs text-center text-gray-400 mt-6">
          Already have an account?{' '}
          <Link to="/login" className="text-pink-600 hover:underline">
            Login
          </Link>
        </p>
      </div>
    </div>
  );
};

export default Register;
