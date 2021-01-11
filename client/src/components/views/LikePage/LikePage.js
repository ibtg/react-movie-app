import React, { useEffect, useState } from 'react';
import Axios from 'axios';
import Slider from '../Slider/Slider'
import './LikePage.scss';

function LikePage() {
  const [likes, setLikes] = useState([]);

  useEffect(() => {
    fetchLikedMovie();
  }, []);

  const fetchLikedMovie = () => {
    Axios.post('/api/like/getLikedMovie', {
      userFrom: localStorage.getItem('userId'),
    }).then((response) => {
      if (response.data.success) {
        setLikes(response.data.likes);
      } else {
        alert('Failed to get liked Movie');
      }
    });
  };

  return (
    <section className="likePage__container">
      <h2 className="likePage__title">MY LIST</h2>
      <ul className="like__lists">
        <Slider pages={likes}></Slider>
      </ul>
    </section>
  );
}

export default LikePage;
