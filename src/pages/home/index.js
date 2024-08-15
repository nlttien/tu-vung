import React, { useEffect, useState } from 'react';
import './home.css'; // Nếu bạn có tệp CSS cho Home
import List from '../../components/list/list';
import useAuthRedirect from '../../hooks/useAuthRedirect';
import useAuth from '../../hooks/useAuth';
import axios from 'axios';

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
      const res = await axios.post("http://127.0.0.1:5001/tu-vung-447ad/us-central1/beServerFunction/api/vocabylary/search", ["時代"])
      setGiaiThich(res.data);

      return null;
    };

    refresh();
  }, []);

  console.log(giaiThich);
  

  // Hàm để chuyển đổi văn bản
  const formatText = (text) => {
    const lines = text.split('\n');
    let html = '';
    let inList = false;

    for (const line of lines) {
      // Xử lý các tiêu đề
      const headingMatch = line.match(/^#+/);
      if (headingMatch) {
        const headingLevel = headingMatch[0].length;
        html += `<h${headingLevel}>${line.substring(headingLevel).trim()}</h${headingLevel}><br/>`;
        continue;
      }

      // Xử lý các danh sách
      if (line.startsWith('* ')) {
        if (!inList) {
          html += '<ul>';
          inList = true;
        }
        html += `<li>${line.substring(2)}</li>`;
      } else {
        // Kết thúc danh sách nếu có
        if (inList) {
          html += '</ul>';
          inList = false;
        }

        // Xử lý nội dung bôi đậm
        const boldText = line.replace(/\*\*(.*?)\*\*/g, '<strong>$1</strong>');

        // Thêm đoạn văn vào HTML
        if (boldText) {
          html += `<p>${boldText}</p>`;
        }
      }
    }

    // Kết thúc danh sách nếu còn
    if (inList) {
      html += '</ul>';
    }

    return html;
  };

  // Component React để hiển thị văn bản
  const DisplayFormattedText = (text) => {
    const formattedText = formatText(text);

    return (
      <div
        dangerouslySetInnerHTML={{ __html: formattedText }}
        style={{ whiteSpace: 'pre-wrap', fontFamily: 'Arial, sans-serif' }}
      />
    );
  };
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
      {giaiThich && DisplayFormattedText(giaiThich)}
    </div>
  );
};

export default Home;
