import React, { useState } from 'react';
import './header.css'; // Nếu bạn có tệp CSS cho Header
import { Link } from 'react-router-dom';

const Header = () => {
    const [menuOpen, setMenuOpen] = useState(false);

    const toggleMenu = () => {
        setMenuOpen(!menuOpen);
    };

    return (
        <header className="bg-white shadow">
            <div className="container mx-auto px-4 py-6 flex justify-between items-center">
                <div className="text-2xl font-bold text-gray-800">
                    MyLogo
                </div>
                <nav className="hidden md:flex space-x-6">
                    <Link to={"#"} className='text-gray-600 hover:text-gray-800'>Home</Link>
                    <Link to={"#"} className='text-gray-600 hover:text-gray-800'>About</Link>
                    <Link to={"#"} className='text-gray-600 hover:text-gray-800'>Services</Link>
                    <Link to={"#"} className='text-gray-600 hover:text-gray-800'>search</Link>
                    <Link to={"/login"} className='text-gray-800 text-xl hover:font-bold'>Login</Link>
                </nav>
                <div className="md:hidden">
                    <button id="mobile-menu-button" onClick={toggleMenu} className="text-gray-600 hover:text-gray-800 focus:outline-none">
                        <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M4 6h16M4 12h16m-7 6h7" />
                        </svg>
                    </button>
                </div>
            </div>
            <div id="mobile-menu" className={`${menuOpen ? 'block' : 'hidden'} md:hidden`}>
                <Link to={"#"} className='block px-4 py-2 text-gray-800 text-xl hover:font-bold'>Login</Link>
                <Link to={"#"} className='block px-4 py-2 text-gray-600 hover:text-gray-800'>Home</Link>
                <Link to={"#"} className='block px-4 py-2 text-gray-600 hover:text-gray-800'>About</Link>
                <Link to={"#"} className='block px-4 py-2 text-gray-600 hover:text-gray-800'>Services</Link>
                <Link to={"#"} className='block px-4 py-2 text-gray-600 hover:text-gray-800'>Contact</Link>
            </div>
        </header>
    );
};

export default Header;