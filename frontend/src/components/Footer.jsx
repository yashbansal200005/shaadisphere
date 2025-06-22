import React from 'react';
import { Link } from 'react-router-dom';

const Footer = () => {
  return (
    <footer className="bg-gray-800 text-white py-10 mt-12">
      <div className="max-w-6xl mx-auto px-4 grid grid-cols-1 md:grid-cols-3 gap-8">
        {/* About */}
        <div>
          <h3 className="text-xl font-semibold mb-2">💑 MatrimonyHub</h3>
          <p className="text-sm text-gray-300">
            India's trusted matchmaking site for connecting hearts and building beautiful life stories. 
          </p>
        </div>

        {/* Navigation */}
        <div>
          <h3 className="text-xl font-semibold mb-2">Quick Links</h3>
          <ul className="space-y-2 text-sm text-gray-300">
            <li><Link to="/" className="hover:underline">Home</Link></li>
            <li><Link to="/about" className="hover:underline">About</Link></li>
            <li><Link to="/register" className="hover:underline">Register</Link></li>
            <li><Link to="/login" className="hover:underline">Login</Link></li>
            <li><Link to="/contact" className="hover:underline">Contact</Link></li>
          </ul>
        </div>

        {/* Contact/Social */}
        <div>
          <h3 className="text-xl font-semibold mb-2">Follow Us</h3>
          <div className="flex gap-4 mt-2">
            <a href="#" className="text-gray-300 hover:text-white">Facebook</a>
            <a href="#" className="text-gray-300 hover:text-white">Instagram</a>
            <a href="#" className="text-gray-300 hover:text-white">Twitter</a>
          </div>
        </div>
      </div>

      <div className="border-t border-gray-700 mt-8 pt-4 text-center text-sm text-gray-400">
        &copy; {new Date().getFullYear()} MatrimonyHub. All rights reserved.
      </div>
    </footer>
  );
};

export default Footer;
