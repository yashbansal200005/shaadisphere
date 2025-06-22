
import React from 'react';

const stories = [
  {
    id: 1,
    names: 'Ananya & Rohan',
    location: 'Jaipur, India',
    image: 'https://randomuser.me/api/portraits/women/65.jpg',
    story:
      'From the first message to forever—ShaadiSphere brought us together in the most magical way. We are now soulmates for life!',
  },
  {
    id: 2,
    names: 'Meera & Aarav',
    location: 'Hyderabad, India',
    image: 'https://randomuser.me/api/portraits/men/61.jpg',
    story:
      'Who knew a simple profile click would lead to a lifetime of love and laughter? Thank you ShaadiSphere for making destiny meet.',
  },
  {
    id: 3,
    names: 'Ritika & Siddharth',
    location: 'Chandigarh, India',
    image: 'https://randomuser.me/api/portraits/women/68.jpg',
    story:
      'We were worlds apart but shared the same dream—to find true love. This platform turned our dream into a beautiful reality.',
  },
];

const SuccessStories = () => {
  return (
    <section className="bg-pink-50 py-16 px-6">
      <div className="text-center mb-12">
        <h2 className="text-3xl md:text-4xl font-extrabold text-gray-800">
          💞 Love That Found Its Way
        </h2>
        <p className="text-lg text-gray-600 mt-3">
          Real couples. Real connections. Real forever. Explore how ShaadiSphere helped hearts unite.
        </p>
      </div>

      <div className="max-w-7xl mx-auto grid gap-10 md:grid-cols-3 sm:grid-cols-2">
        {stories.map((story) => (
          <div
            key={story.id}
            className="bg-white p-6 rounded-2xl shadow-lg hover:shadow-xl transition duration-300 text-center"
          >
            <img
              src={story.image}
              alt={story.names}
              className="w-24 h-24 mx-auto rounded-full object-cover mb-4 border-4 border-pink-300"
            />
            <h3 className="text-xl font-semibold text-pink-600">{story.names}</h3>
            <p className="text-sm text-gray-500 mb-3">{story.location}</p>
            <p className="text-gray-700 italic text-sm leading-relaxed">
              “{story.story}”
            </p>
          </div>
        ))}
      </div>
    </section>
  );
};

export default SuccessStories;
