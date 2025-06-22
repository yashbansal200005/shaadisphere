
import React from 'react';
import { Link } from 'react-router-dom';

const heroImage =
  'https://media.istockphoto.com/id/1186214696/photo/hindu-wedding-ritual-wherein-bride-and-groom-hand.jpg?s=612x612&w=0&k=20&c=fTlNejRdY7dkvk742auNgI3j6Ve9UqqWSnb3QJ-D2gw=';

const Hero = () => {
  return (
    <section className="bg-pink-50 py-16 px-6 mt-20">
      <div className="max-w-7xl mx-auto flex flex-col-reverse md:flex-row items-center gap-12">
        {/* Left Content */}
        <div className="flex-1 text-center md:text-left">
          <h1 className="text-4xl md:text-5xl font-extrabold text-gray-800 mb-4 leading-tight">
            Begin Your <span className="text-pink-600">Forever Journey</span> Today
          </h1>
          <p className="text-lg text-gray-700 mb-6">
            Discover handpicked, verified profiles to find your life partner. It's more than a match—it's a meaningful connection.
          </p>
          <Link to="/register">
            <button className="bg-pink-600 hover:bg-pink-700 text-white text-lg px-6 py-3 rounded-full shadow-lg transition duration-300 ease-in-out">
              💖 Join Now — It's Free!
            </button>
          </Link>
        </div>

        {/* Right Image */}
        <div className="flex-1">
          <img
            src={heroImage}
            alt="Indian Wedding Ritual"
            className="w-full h-auto rounded-2xl object-cover shadow-2xl"
          />
        </div>
      </div>
    </section>
  );
};

export default Hero;
