import React from 'react';
import './home.css'; // Nếu bạn có tệp CSS cho Home
import List from '../../components/list/list';

const Home = () => {
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
    <List items={flashcards} />
  );
};

export default Home;
