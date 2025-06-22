import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Navbar from './components/Navbar';
import Home from './pages/Home';
import Search from './pages/Search';

import Contact from './pages/Contact';
import Login from './pages/Login';
import Register from './pages/Register';
import Footer from './components/Footer';
import ProfileUpdate from './pages/ProfileUpdate';
import PublicProfile from './pages/PublicProfile';
import MyBookmark from './pages/MyBookmarks';

function App() {
  return (
    <Router>
      <div>
        <Navbar />
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/search" element={<Search />} />
         
          <Route path="/contact" element={<Contact />} />
          <Route path="/login" element={<Login />} />
          <Route path="/register" element={<Register />} />
          <Route path="/profile-update" element={<ProfileUpdate />} />
          <Route path="/profile/:id" element={<PublicProfile />} />
          <Route path="/my-bookmarks" element={<MyBookmark />} />
        </Routes>
        <Footer />
      </div>
    </Router>
  );
}

export default App;
