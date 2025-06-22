import React, { useState } from 'react';
import { Mail, Phone, MapPin } from 'lucide-react';

const Contact = () => {
  const [form, setForm] = useState({ name: '', email: '', message: '' });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setForm((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    console.log('Message Sent:', form);
    alert('Your message has been sent!');
    setForm({ name: '', email: '', message: '' });
  };

  return (
    <div className="mt-24 px-6 py-16 max-w-6xl mx-auto bg-pink-50 rounded-xl shadow-md">
      <h2 className="text-4xl font-bold text-center text-pink-700 mb-12">
        💌 Get in Touch with ShaadiSphere
      </h2>

      <div className="grid md:grid-cols-2 gap-12">
        {/* Contact Info */}
        <div className="space-y-8 text-gray-800">
          <div className="flex items-start gap-4">
            <Mail className="text-pink-600 mt-1" size={24} />
            <div>
              <p className="font-semibold">Email</p>
              <p className="text-sm">support@shaadisphere.com</p>
            </div>
          </div>

          <div className="flex items-start gap-4">
            <Phone className="text-pink-600 mt-1" size={24} />
            <div>
              <p className="font-semibold">Phone</p>
              <p className="text-sm">+91 8319527344</p>
            </div>
          </div>

          <div className="flex items-start gap-4">
            <MapPin className="text-pink-600 mt-1" size={24} />
            <div>
              <p className="font-semibold">Address</p>
              <p className="text-sm">Nagpur, Maharashtra, India</p>
            </div>
          </div>
        </div>

        {/* Contact Form */}
        <form onSubmit={handleSubmit} className="bg-white p-8 rounded-lg shadow-lg space-y-6">
          <input
            type="text"
            name="name"
            placeholder="Your Name"
            value={form.name}
            onChange={handleChange}
            className="w-full border border-gray-300 rounded px-4 py-2 focus:outline-none focus:ring-2 focus:ring-pink-500"
            required
          />
          <input
            type="email"
            name="email"
            placeholder="Your Email"
            value={form.email}
            onChange={handleChange}
            className="w-full border border-gray-300 rounded px-4 py-2 focus:outline-none focus:ring-2 focus:ring-pink-500"
            required
          />
          <textarea
            name="message"
            placeholder="Your Message"
            rows="5"
            value={form.message}
            onChange={handleChange}
            className="w-full border border-gray-300 rounded px-4 py-2 focus:outline-none focus:ring-2 focus:ring-pink-500"
            required
          />
          <button
            type="submit"
            className="bg-pink-600 hover:bg-pink-700 text-white font-semibold w-full py-2 rounded transition duration-300"
          >
            📩 Send Message
          </button>
        </form>
      </div>
    </div>
  );
};

export default Contact;
