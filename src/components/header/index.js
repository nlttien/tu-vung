import React, { useContext, useEffect, useState } from 'react';
import './header.css'; // Import CSS for styling the Header component
import { Link } from 'react-router-dom';
import AuthContext from '../../contexts/AuthContext';
import logo from "../../logo/nihongo-high-resolution-logo-transparent.png"; // Path to the logo image
import useAuth from '../../hooks/useAuth';
import { FaHome, FaBook, FaSearch, FaGamepad, FaSignInAlt, FaChevronRight, FaSun, FaMoon } from "react-icons/fa";
import DarkModeContext from '../../contexts/DarkModeContext';

const Header = () => {
  const [activeTab, setActiveTab] = useState("Home");
  const { isAuthenticated } = useContext(AuthContext);
  const { logout } = useAuth();
  const { darkMode, toggleDarkMode } = useContext(DarkModeContext)

  const [tabs, setTabs] = useState([
    { name: "Home", icon: FaHome, link: "/" },
    { name: "Ngữ pháp", icon: FaBook, link: "/ngu-phap" },
    { name: "Search", icon: FaSearch, link: "/search" },
    { name: "Game", icon: FaGamepad, link: "/game" },
    { name: isAuthenticated ? "Login" : "logout", icon: FaSignInAlt, link: isAuthenticated ? "#" : "/login", action: isAuthenticated ? logout : null }
  ])
  useEffect(() => {
    setTabs([
      { name: "Home", icon: FaHome, link: "/" },
      { name: "Ngữ pháp", icon: FaBook, link: "/ngu-phap" },
      { name: "Search", icon: FaSearch, link: "/search" },
      { name: "Game", icon: FaGamepad, link: "/game" },
      { name: isAuthenticated ? "Login" : "logout", icon: FaSignInAlt, link: isAuthenticated ? "#" : "/login", action: isAuthenticated ? logout : null }
    ])
  }, [isAuthenticated])

  const handleTabClick = (tabName) => {
    setActiveTab(tabName);
  };

  return (
    <div className={`w-full ${darkMode ? 'bg-gray-800' : 'bg-theme-color-primary'}  bg-theme-color-primary shadow-sm`}>
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <nav className="flex items-center justify-between h-14">
          {/* Logo */}
          <div className="flex-shrink-0">
            <img className="h-8 w-auto" src={logo} alt="Logo" />
          </div>

          {/* Desktop view */}
          <div className="hidden md:flex space-x-1">
            {tabs.map((tab) => (
              <button
                key={tab.name}
                onClick={() => handleTabClick(tab.name)}
                className={`flex items-center px-2 py-1 rounded-md text-sm font-medium ${activeTab === tab.name
                  ? darkMode
                    ? 'bg-gray-700 text-white'
                    : 'bg-theme-color-secondary text-theme-color-primary'
                  : darkMode
                    ? 'text-gray-300 hover:bg-gray-700 hover:text-white'
                    : 'text-theme-color-secondary hover:bg-theme-color-primary-dark hover:text-theme-color-secondary'
                  } transition-all duration-200 ease-in-out focus:outline-none focus:ring-1 focus:ring-theme-color-secondary`}
                aria-current={activeTab === tab.name ? "page" : undefined}
              >
                <tab.icon className="h-4 w-4 mr-1" aria-hidden="true" />
                <Link to={tab.link}>{tab.name}</Link>
              </button>
            ))}
          </div>

          {/* Mobile view */}
          <div className="md:hidden">
            <select
              value={activeTab}
              onChange={(e) => handleTabClick(e.target.value)}
              className={`block w-full py-1 px-2 text-sm border ${darkMode
                  ? 'border-gray-600 bg-gray-700 text-white'
                  : 'border-theme-color-secondary bg-theme-color-primary text-theme-color-secondary'
                } rounded-md shadow-sm focus:outline-none focus:ring-1 focus:ring-theme-color-secondary focus:border-theme-color-secondary`}
            >
              {tabs.map((tab) => (
                <option key={tab.name} value={tab.name}>
                  <Link to={tab.link}>{tab.name}</Link>
                </option>
              ))}
            </select>
          </div>

          <button
            onClick={toggleDarkMode}
            className={`ml-4 p-2 rounded-full ${darkMode
              ? 'bg-gray-700 text-yellow-400 hover:bg-gray-600'
              : 'bg-gray-200 text-gray-800 hover:bg-gray-300'
              } transition-colors duration-300`}
          >
            {darkMode ? <FaSun className="h-5 w-5" /> : <FaMoon className="h-5 w-5" />}
          </button>
        </nav>
      </div>
      {/* Breadcrumb */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-2">
        <nav className="flex" aria-label="Breadcrumb">
          <ol className="inline-flex items-center space-x-1 md:space-x-3">
            <li className="inline-flex items-center">
              <a href="#" className={`inline-flex items-center text-sm font-medium ${darkMode ? 'text-gray-300 hover:text-white' : 'text-theme-color-secondary hover:text-theme-color-secondary-dark'
                }`}>
                <FaHome className="mr-2 h-4 w-4" />
                Home
              </a>
            </li>
            <li>
              <div className="flex items-center">
              <FaChevronRight className={`h-5 w-5 ${darkMode ? 'text-gray-500' : 'text-theme-color-secondary'}`} aria-hidden="true" />
                <a href="#" className={`ml-1 text-sm font-medium ${
                  darkMode ? 'text-gray-300 hover:text-white' : 'text-theme-color-secondary hover:text-theme-color-secondary-dark'
                } md:ml-2`}>{activeTab}</a>
              </div>
            </li>
          </ol>
        </nav>
      </div>
    </div>
  );
};

export default Header;