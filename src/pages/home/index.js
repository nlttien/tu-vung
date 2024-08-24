import React, { useEffect } from 'react';
import './home.css'; // Nếu bạn có tệp CSS cho Home
import useAuthRedirect from '../../hooks/useAuthRedirect';
import useAuth from '../../hooks/useAuth';
import List from "../../components/list";
import KanjiDrawer from '../../dmark/KanjiDrawer';

const Home = () => {
  useAuthRedirect(false, "/admin", "/");
  const { refreshToken } = useAuth();

  useEffect(() => {
    const refresh = async () => {
      await refreshToken();

      return null;
    };

    refresh();
  }, [refreshToken]);

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
    <div className='container mx-auto px-10'>
      {/* <List items={flashcards} /> */}
      
      <KanjiDrawer
        kanji="備" // Thay bằng ký tự Kanji mà bạn muốn vẽ
      />
    </div>
  );
};

export default Home;
