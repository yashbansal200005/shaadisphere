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
    console.log("Message Sent:", form);
    // Optionally send data to your backend here
    alert("Your message has been sent!");
    setForm({ name: '', email: '', message: '' });
  };

  return (
    <div className="mt-24 px-6 max-w-5xl mx-auto">
      <h2 className="text-3xl font-bold text-center text-pink-700 mb-10">Contact Us</h2>
      
      <div className="grid md:grid-cols-2 gap-10">
        {/* Left: Contact Info */}
        <div className="space-y-6 text-gray-700">
          <div className="flex items-start gap-4">
            <Mail className="text-pink-600 mt-1" />
            <div>
              <p className="font-semibold">Email</p>
              <p>support@yourdomain.com</p>
            </div>
          </div>
          <div className="flex items-start gap-4">
            <Phone className="text-pink-600 mt-1" />
            <div>
              <p className="font-semibold">Phone</p>
              <p>+91 98765 43210</p>
            </div>
          </div>
          <div className="flex items-start gap-4">
            <MapPin className="text-pink-600 mt-1" />
            <div>
              <p className="font-semibold">Address</p>
              <p>123, Matrimony Lane, Love City, India</p>
            </div>
          </div>
        </div>

        {/* Right: Contact Form */}
        <form onSubmit={handleSubmit} className="bg-white p-6 rounded-lg shadow-md space-y-4">
          <input
            type="text"
            name="name"
            placeholder="Your Name"
            value={form.name}
            onChange={handleChange}
            className="input"
            required
          />
          <input
            type="email"
            name="email"
            placeholder="Your Email"
            value={form.email}
            onChange={handleChange}
            className="input"
            required
          />
          <textarea
            name="message"
            placeholder="Your Message"
            rows="4"
            value={form.message}
            onChange={handleChange}
            className="input"
            required
          ></textarea>
          <button type="submit" className="bg-pink-600 text-white w-full py-2 rounded hover:bg-pink-700">
            Send Message
          </button>
        </form>
      </div>
    </div>
  );
};

export default Contact;
