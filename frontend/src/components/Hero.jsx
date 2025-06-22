
import React from 'react';
import { Link } from 'react-router-dom';

const heroImage = 'https://media.istockphoto.com/id/866987706/photo/indian-wedding-hands.webp?a=1&b=1&s=612x612&w=0&k=20&c=aSL4uDc6-GtBj6j4-mEyISrN6mBo_Ryz2oXMk2XRVTw=';

const Hero = () => {
  return (
    <section className="mt-20 px-6 py-12 bg-pink-50">
      <div className="max-w-7xl mx-auto flex flex-col md:flex-row items-center justify-between gap-10">
        {/* Left: Text Content */}
        <div className="flex-1 text-center md:text-left">
          <h1 className="text-4xl md:text-5xl font-extrabold text-gray-800 mb-4">
            Find Your <span className="text-pink-600">Perfect Match</span>
          </h1>
          <p className="text-lg text-gray-600 mb-6">
            Join millions of users and connect with genuine profiles across the world.
          </p>
          <Link to="/register">
            <button className="bg-pink-600 hover:bg-pink-700 text-white px-6 py-3 rounded text-lg shadow">
              ❤️ Register for Free
            </button>
          </Link>
        </div>

        {/* Right: Image */}
        <div className="flex-1">
          <img
            src={heroImage}
            alt="Wedding hands"
            className="rounded-xl w-full h-auto shadow-lg object-cover"
          />
        </div>
      </div>
    </section>
  );
};

export default Hero;

