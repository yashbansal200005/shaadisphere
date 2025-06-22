import React from 'react';
import { Link } from 'react-router-dom';
import { FaFacebookF, FaInstagram, FaTwitter } from 'react-icons/fa';

const Footer = () => {
  return (
    <footer className="bg-gray-900 text-white pt-12 pb-6 mt-16">
      <div className="max-w-7xl mx-auto px-6 grid grid-cols-1 md:grid-cols-3 gap-12">
        {/* About Section */}
        <div>
          <h3 className="text-2xl font-bold text-pink-500 mb-4">💖 ShaadiSphere</h3>
          <p className="text-sm text-gray-300 leading-relaxed">
            Bringing hearts together across India. ShaadiSphere is your trusted companion in the journey of love,
            faith, and lifelong companionship.
          </p>
        </div>

        {/* Quick Navigation Links */}
        <div>
          <h3 className="text-xl font-semibold text-white mb-4">Quick Links</h3>
          <ul className="space-y-2 text-sm">
            <li><Link to="/" className="hover:text-pink-400 transition">Home</Link></li>
            <li><Link to="/about" className="hover:text-pink-400 transition">About</Link></li>
            <li><Link to="/register" className="hover:text-pink-400 transition">Register</Link></li>
            <li><Link to="/login" className="hover:text-pink-400 transition">Login</Link></li>
            <li><Link to="/contact" className="hover:text-pink-400 transition">Contact</Link></li>
          </ul>
        </div>

        {/* Social Media */}
        <div>
          <h3 className="text-xl font-semibold text-white mb-4">Connect With Us</h3>
          <div className="flex gap-6 mt-2">
            <a href="#" className="text-gray-400 hover:text-white transition text-lg" aria-label="Facebook">
              <FaFacebookF />
            </a>
            <a href="#" className="text-gray-400 hover:text-white transition text-lg" aria-label="Instagram">
              <FaInstagram />
            </a>
            <a href="#" className="text-gray-400 hover:text-white transition text-lg" aria-label="Twitter">
              <FaTwitter />
            </a>
          </div>
        </div>
      </div>

      {/* Footer Bottom Text */}
      <div className="border-t border-gray-700 mt-10 pt-4 text-center text-sm text-gray-400">
        &copy; {new Date().getFullYear()} ShaadiSphere. All rights reserved. Crafted with 💕 for every love story.
      </div>
    </footer>
  );
};

export default Footer;
