import React, { useEffect, useState } from 'react';
import Axios from 'axios';
import Card from '../Card/Card'
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
        {likes.map((like) => (
        <Card page={like} key={like.id}></Card>))} 
      </ul>
    </section>
  );
}

export default LikePage;
