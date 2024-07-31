import React from 'react';
import { Link } from 'react-router-dom';
import './header.css'; // Nếu bạn có tệp CSS cho Header

const Header = () => {
    return (
        <header className="header">
            <div className="logo">
                <h1>My Website</h1>
            </div>
            <nav className="nav">
                <ul>
                    <li><Link to="/">Home</Link></li>
                </ul>
            </nav>
        </header>
    );
};

export default Header;