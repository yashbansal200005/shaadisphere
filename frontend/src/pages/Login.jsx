import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
import { useAuth } from '../context/AuthContext';

const Login = () => {
  const [form, setForm] = useState({ emailOrPhone: '', password: '' });
  const [error, setError] = useState('');
  const navigate = useNavigate();
  const { login } = useAuth();

  const handleChange = (e) => setForm({ ...form, [e.target.name]: e.target.value });

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const res = await axios.post(`${import.meta.env.VITE_BACKEND_URL}/api/auth/login`, form);
      if (res.data.token) {
        login(res.data.token); // updates context + localStorage
        navigate('/');
      } else {
        setError(res.data.message || 'Login failed');
      }
    } catch (err) {
      setError(err.response?.data?.message || 'Server error');
    }
  };

  return (
    <div className="min-h-screen flex justify-center items-center bg-gray-50 pt-20">
      <form onSubmit={handleSubmit} className="bg-white p-6 rounded shadow-md w-full max-w-md">
        <h2 className="text-2xl font-bold mb-4 text-pink-600">Login</h2>
        {error && <p className="text-red-500 text-sm mb-2">{error}</p>}
         <div className="space-y-4">
        <input type="text" name="emailOrPhone" placeholder="Email or Phone" className="w-full px-4 py-2 border rounded focus:outline-none focus:ring-2 focus:ring-pink-400" value={form.emailOrPhone} onChange={handleChange} required />
        <input type="password" name="password" placeholder="Password" className="w-full px-4 py-2 border rounded focus:outline-none focus:ring-2 focus:ring-pink-400" value={form.password} onChange={handleChange} required />
        <button type="submit" className="w-full bg-pink-600 text-white py-2 rounded mt-4 hover:bg-pink-700">Login</button>
        </div>
      </form>
    </div>
  );
};

export default Login;
