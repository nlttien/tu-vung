import React, { useContext, useEffect } from 'react';
import './home.css'; // Nếu bạn có tệp CSS cho Home
import List from '../../components/list/list';
import Header from '../../components/header';
import { Link, useNavigate } from 'react-router-dom';
import AuthContext from '../../components/AuthContext';

const Home = () => {
  const { isAuthenticated } = useContext(AuthContext);
  const navigate = useNavigate();

  useEffect(() => {
    const checkAuthNavigate = async () => {
      if (!isAuthenticated) {
        navigate('/login');
        return null;
      }
    };

    checkAuthNavigate();
  }, [isAuthenticated, navigate]);

  const flashcards = [
    { front: 'Front 1', back: 'Bsdddddddddddddddddddddddddsdfasdfadfzsddfsdfasdfasdfack 1' },
    { front: 'Front 2', back: 'Back 2BsdddddddddddddddddddddddddsdfasdfadfzsddfsdfasdfasdfackBsdddddddddddddddddddddddddsdfasdfadfzsddfsdfasdfasdfackBsdddddddddddddddddddddddddsdfasdfadfzsddfsdfasdfasdfackBsdddddddddddddddddddddddddsdfasdfadfzsddfsdfasdfasdfack' },
    { front: 'Front 3', back: 'Back 3' },
    { front: 'Front 4', back: 'Back 4' },
    { front: 'Front 5', back: 'Bac2BsdddddddddddddddddddddddddsdfasdfadfzsddfsdfasdfasdfackBsdddddddddddddddddddddddddsdfasdfadfzsddfsdfasdfasdfackBsdddddddddddddddddddddddddsdfasdfadfzsddfsdfasdfasdfackBsdddddddddddddddddddddddddsdfasdfadfzsddfsdfasdfasdfackk 5' },
    { front: 'Front 6', back: 'Back 6' },
    { front: 'Front 6', back: 'Back 6' },
    { front: 'Front 6', back: 'Back 6' },
    { front: 'Front 6', back: 'Back 6' },
    { front: 'Front 6', back: 'Back 6' },
    { front: 'Front 6', back: 'Back 6' },
    { front: 'Front 6', back: 'Back 6' },
    { front: 'Front 6', back: 'Back 6' },
    { front: 'Front 6', back: 'Back 6' },
    // Add more flashcards as needed
  ];

  return (
    <>
      <Header />
      <div className='container mx-auto px-10'>
        <nav className='p-3'>
          <ul>
            <li><Link to="/">Home</Link></li>
          </ul>
        </nav>
        <List items={flashcards} />
      </div>
    </>
  );
};

export default Home;
