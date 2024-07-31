import React from 'react';
import { Link } from 'react-router-dom';
import './header.css'; // Nếu bạn có tệp CSS cho Header

const Header = () => {
    return (
        <>
            <header class="bg-white shadow">
                <div class="container mx-auto px-4 py-6 flex justify-between items-center">
                    <div class="text-2xl font-bold text-gray-800">
                        MyLogo
                    </div>
                    <nav class="hidden md:flex space-x-6">
                        <a href="#" class="text-gray-600 hover:text-gray-800">Home</a>
                        <a href="#" class="text-gray-600 hover:text-gray-800">About</a>
                        <a href="#" class="text-gray-600 hover:text-gray-800">Services</a>
                        <a href="#" class="text-gray-600 hover:text-gray-800">Contact</a>
                    </nav>
                    <div class="md:hidden">
                        <button id="mobile-menu-button" class="text-gray-600 hover:text-gray-800 focus:outline-none">
                            <svg xmlns="http://www.w3.org/2000/svg" class="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M4 6h16M4 12h16m-7 6h7" />
                            </svg>
                        </button>
                    </div>
                </div>
                <div id="mobile-menu" class="hidden md:hidden">
                    <a href="#" class="block px-4 py-2 text-gray-600 hover:text-gray-800">Home</a>
                    <a href="#" class="block px-4 py-2 text-gray-600 hover:text-gray-800">About</a>
                    <a href="#" class="block px-4 py-2 text-gray-600 hover:text-gray-800">Services</a>
                    <a href="#" class="block px-4 py-2 text-gray-600 hover:text-gray-800">Contact</a>
                </div>
            </header>

            <main class="container mx-auto px-4 py-8">
                <h1 class="text-4xl font-bold text-gray-800 mb-6">Welcome to My Website</h1>
                <p class="text-gray-600">This is an example of a responsive header using Tailwind CSS.</p>
                <p class="text-gray-600">lorem</p>
            </main>
        </>
    );
};

export default Header;