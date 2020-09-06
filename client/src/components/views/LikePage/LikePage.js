import React, { useEffect, useState } from 'react';
import Axios from 'axios';
import { IMAGE_BASE_URL } from '../../Config';
import { TiDeleteOutline } from 'react-icons/ti';

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

  const onClickDelete = (movieId, userFrom) => {
    const variables = {
      movieId,
      userFrom,
    };

    Axios.post('/api/like/removeFromLike', variables).then((response) => {
      if (response.data.success) {
        fetchLikedMovie();
      } else {
        alert('Failed to remove from the list');
      }
    });
  };

  const renderLikes = likes.map((like, index) => {
    return (
      <li key={index} className="like__item">
        <img
          className="like__image"
          src={`${IMAGE_BASE_URL}w300${like.moviePost}`}
          alt={like.movieTitle}
        />
        <button
          className="like__removeBtn"
          onClick={() => {
            onClickDelete(like.movieId, like.userFrom);
          }}
        >
          <TiDeleteOutline></TiDeleteOutline>
        </button>
      </li>
    );
  });

  return (
    <section className="likePage__container">
      <ul className="like__lists">{renderLikes}</ul>
    </section>
  );
}

export default LikePage;
