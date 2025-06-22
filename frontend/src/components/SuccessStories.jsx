import React from 'react';

const stories = [
  {
    id: 1,
    names: 'Priya & Arjun',
    location: 'Delhi, India',
    image: 'https://randomuser.me/api/portraits/women/50.jpg',
    story: 'We met on this platform and felt an instant connection. Within months, we tied the knot and couldn’t be happier!',
  },
  {
    id: 2,
    names: 'Sneha & Kunal',
    location: 'Mumbai, India',
    image: 'https://randomuser.me/api/portraits/men/52.jpg',
    story: 'We were total strangers, but this site brought us together. Thanks for changing our lives forever.',
  },
  {
    id: 3,
    names: 'Neha & Vikram',
    location: 'Pune, India',
    image: 'https://randomuser.me/api/portraits/women/45.jpg',
    story: 'We both were hesitant at first, but this platform made us believe in true love. Grateful forever!',
  },
];

const SuccessStories = () => {
  return (
    <section className="bg-pink-50 py-12 px-4">
      <h2 className="text-2xl font-bold text-center text-gray-800 mb-10">
        💖 Real Love Stories
      </h2>

      <div className="max-w-6xl mx-auto grid md:grid-cols-3 gap-8">
        {stories.map((story) => (
          <div key={story.id} className="bg-white p-6 rounded-lg shadow-md text-center hover:shadow-lg transition">
            <img
              src={story.image}
              alt={story.names}
              className="w-24 h-24 mx-auto rounded-full object-cover mb-4 border-4 border-pink-200"
            />
            <h3 className="text-lg font-semibold text-pink-600">{story.names}</h3>
            <p className="text-sm text-gray-500 mb-2">{story.location}</p>
            <p className="text-gray-700 text-sm italic">"{story.story}"</p>
          </div>
        ))}
      </div>
    </section>
  );
};

export default SuccessStories;
