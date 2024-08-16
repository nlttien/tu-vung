import React, { useEffect, useState } from 'react';
import './home.css'; // Nếu bạn có tệp CSS cho Home
import useAuthRedirect from '../../hooks/useAuthRedirect';
import useAuth from '../../hooks/useAuth';
import axios from 'axios';
import VocabularyDetails from "../../components/VocabularyDetails";

const Home = () => {
  useAuthRedirect(false, "/admin", "/");
  const [giaiThich, setGiaiThich] = useState()
  const { refreshToken } = useAuth();

  useEffect(() => {
    const refresh = async () => {
      await refreshToken();

      return null;
    };

    refresh();
  }, [refreshToken]);

  useEffect(() => {
    const refresh = async () => {
      const res = await axios.post("http://127.0.0.1:5001/tu-vung-447ad/us-central1/beServerFunction/api/vocabylary/search", { subject: "時代" })
      setGiaiThich(res.data);

      return null;
    };

    refresh();
  }, []);

  console.log(giaiThich);

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
      {giaiThich && <VocabularyDetails details={giaiThich} />}
    </div>
  );
};

export default Home;
