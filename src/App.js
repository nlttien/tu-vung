import React from 'react';
import { BrowserRouter as Router, Route, Routes, Link } from 'react-router-dom';
import Home from './pages/home';
import Header from './components/header'; // Nếu bạn có header
import './App.css';

const App = () => {
  return (
    <Router>
      <Header />
      <div className='container mx-auto px-10'>
        <nav>
          <ul>
            <li><Link to="/">Home</Link></li>
          </ul>
        </nav>
        <Routes>
          <Route path="/" element={<Home />} />
        </Routes>
      </div>
    </Router>
  );
};

export default App;
