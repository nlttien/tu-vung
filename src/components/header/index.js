import React, { useContext, useState } from 'react';
import './header.css'; // Import CSS for styling the Header component
import { Link } from 'react-router-dom';
import AuthContext from '../../contexts/AuthContext';
import logo from "../../logo/nihongo-high-resolution-logo-transparent.png"; // Path to the logo image
import useAuth from '../../hooks/useAuth';

const Header = () => {
  // State to manage the mobile menu's open/closed state
  const [menuOpen, setMenuOpen] = useState(false);
  // Use context to get authentication status
  const { isAuthenticated } = useContext(AuthContext);
  // Custom hook for authentication actions
  const { logout } = useAuth();

  // Toggle the mobile menu's open/closed state
  const toggleMenu = () => {
    setMenuOpen(!menuOpen);
  };

  return (
    <header className="bg-white shadow px-">
      {/* Container for header content */}
      <div className="container mx-auto px-4 py-6 flex justify-between items-center">
        {/* Logo section */}
        <div className="text-2xl font-bold text-gray-800">
          <img
            src={logo} // Path to the logo image
            alt="My Logo" // Alt text for the logo image
            className="h-10 w-auto" // Adjust height and width as needed
          />
        </div>

        {/* Navigation for larger screens */}
        <nav className="hidden md:flex space-x-6">
          <Link to="/" className='text-gray-600 hover:text-gray-800'>Home</Link>
          <Link to="/type" className='text-gray-600 hover:text-gray-800'>Type</Link>
          <Link to="/search" className='text-gray-600 hover:text-gray-800'>Search</Link>
          <Link to="/game" className='text-gray-600 hover:text-gray-800'>Game</Link>
          {
            // Conditionally render Logout or Login based on authentication status
            isAuthenticated ?
              <Link to="#" className='text-gray-800 text-xl hover:font-bold' onClick={logout}>Logout</Link> :
              <Link to="/login" className='text-gray-800 text-xl hover:font-bold'>Login</Link>
          }
        </nav>

        {/* Mobile menu button */}
        <div className="md:hidden">
          <button id="mobile-menu-button" onClick={toggleMenu} className="text-gray-600 hover:text-gray-800 focus:outline-none">
            {/* Icon for the mobile menu button */}
            <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M4 6h16M4 12h16m-7 6h7" />
            </svg>
          </button>
        </div>
      </div>

      {/* Mobile menu */}
      <div id="mobile-menu" className={`${menuOpen ? 'block' : 'hidden'} md:hidden`}>
        {/* Conditionally render Logout or Login in the mobile menu */}
        <Link to="#" className='block px-4 py-2 text-gray-800 text-xl hover:font-bold' onClick={logout}>Logout</Link>
        <Link to="/" className='block px-4 text-gray-600 hover:text-gray-800'>Home</Link>
        <Link to="/type" className='block px-4 text-gray-600 hover:text-gray-800'>Type</Link>
        <Link to="/search" className='block px-4 text-gray-600 hover:text-gray-800'>Search</Link>
        <Link to="/game" className='block px-4 text-gray-600 hover:text-gray-800'>Game</Link>
      </div>
    </header>
  );
};

export default Header;
