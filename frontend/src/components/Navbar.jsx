
import { Link, NavLink } from 'react-router-dom';
import { useState, useEffect } from 'react';
import { useAuth } from '../context/AuthContext'; 
import { useNavigate } from 'react-router-dom';

const Navbar = () => {
  const { isAuthenticated, logout, token } = useAuth();
  const [isMobileOpen, setIsMobileOpen] = useState(false);
  const navigate = useNavigate();

  const toggleMobileMenu = () => setIsMobileOpen(!isMobileOpen);

  const handleLogout = () => {
    logout();          
    navigate('/');
  };

  useEffect(() => {
    if (!token) {
      navigate('/');
    }
  }, [token]);

  return (
    <nav className="bg-white shadow-md fixed top-0 w-full z-50">
      <div className="max-w-7xl mx-auto px-4 py-3 flex justify-between items-center">
        {/* Logo */}
        <Link to="/" className="text-2xl font-bold text-pink-600">
          Shaadi<span className="text-gray-800">Sphere</span>
        </Link>

        {/* Desktop Menu */}
        <ul className="hidden md:flex items-center space-x-6 text-gray-700 font-medium">
          <li><NavLink to="/" className="hover:text-pink-600">Home</NavLink></li>
          <li><NavLink to="/search" className="hover:text-pink-600">Search</NavLink></li>
          <li><NavLink to="/contact" className="hover:text-pink-600">Contact</NavLink></li>
          {isAuthenticated && (
            <li><NavLink to="/my-bookmarks" className="hover:text-pink-600">Bookmarks</NavLink></li>
          )}
        </ul>

        {/* Auth Section */}
        <div className="hidden md:flex items-center space-x-4 relative">
          {token? (
            <div className="relative group">
              <img
                src="https://t4.ftcdn.net/jpg/00/65/77/27/360_F_65772719_A1UV5kLi5nCEWI0BNLLiFaBPEkUbv5Fv.jpg"
                alt="profile"
                className="w-10 h-10 rounded-full cursor-pointer"
              />
              <div className="hidden group-hover:block absolute right-0 pt-2">
                <div className="bg-slate-100 py-3 px-4 rounded shadow-md flex flex-col gap-2 w-36 text-sm text-gray-600">
                  <Link to="/profile-update" className="hover:text-black">My Profile</Link>
                  <p onClick={handleLogout} className="cursor-pointer hover:text-black">Logout</p>
                </div>
              </div>
            </div>
          ) : (
            <>
              <NavLink
                to="/login"
                className="px-4 py-2 border border-pink-600 text-pink-600 rounded hover:bg-pink-50"
              >
                Login
              </NavLink>
              <NavLink
                to="/register"
                className="px-4 py-2 bg-pink-600 text-white rounded hover:bg-pink-700"
              >
                Register
              </NavLink>
            </>
          )}
        </div>

        {/* Mobile Menu Icon */}
        <button onClick={toggleMobileMenu} className="md:hidden">
          <svg
            className="w-6 h-6 text-gray-700"
            fill="none"
            stroke="currentColor"
            viewBox="0 0 24 24"
            strokeWidth="2"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              d={
                isMobileOpen
                  ? "M6 18L18 6M6 6l12 12"
                  : "M4 6h16M4 12h16M4 18h16"
              }
            />
          </svg>
        </button>
      </div>

      {/* Mobile Dropdown */}
      {isMobileOpen && (
        <div className="md:hidden bg-white shadow-md px-4 py-4 space-y-3">
          <NavLink to="/" className="block hover:text-pink-600" onClick={toggleMobileMenu}>Home</NavLink>
          <NavLink to="/search" className="block hover:text-pink-600" onClick={toggleMobileMenu}>Search</NavLink>
          <NavLink to="/contact" className="block hover:text-pink-600" onClick={toggleMobileMenu}>Contact</NavLink>
          {isAuthenticated && (
            <>
              <NavLink to="/my-bookmarks" className="block hover:text-pink-600" onClick={toggleMobileMenu}>Bookmarks</NavLink>
              <NavLink to="/profile-update" className="block hover:text-pink-600" onClick={toggleMobileMenu}>My Profile</NavLink>
              <button
                onClick={() => { handleLogout(); toggleMobileMenu(); }}
                className="block text-left w-full text-pink-600"
              >
                Logout
              </button>
            </>
          )}
          {!isAuthenticated && (
            <div className="pt-3 space-y-2">
              <NavLink
                to="/login"
                className="block border border-pink-600 text-pink-600 py-2 rounded text-center"
                onClick={toggleMobileMenu}
              >
                Login
              </NavLink>
              <NavLink
                to="/register"
                className="block bg-pink-600 text-white py-2 rounded text-center"
                onClick={toggleMobileMenu}
              >
                Register
              </NavLink>
            </div>
          )}
        </div>
      )}
    </nav>
  );
};

export default Navbar;



