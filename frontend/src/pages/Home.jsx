import Hero from '../components/Hero';

import FeaturedProfiles from '../components/FeaturedProfiles';
import SuccessStories from '../components/SuccessStories';

const Home = () => (
  <div className="mt-20">
    <Hero />
    {/* You can add other sections here like QuickSearch, etc. */}
    <FeaturedProfiles />
    <SuccessStories />
    
  </div>
);

export default Home;
