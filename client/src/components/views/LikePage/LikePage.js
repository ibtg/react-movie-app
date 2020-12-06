import React, { useEffect, useState } from 'react';
import Axios from 'axios';
import { IMAGE_BASE_URL } from '../../Config';
import { TiDeleteOutline } from 'react-icons/ti';
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

  const onClickDelete = (id, userFrom) => {
    const variables = {
      id,
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
          src={`${IMAGE_BASE_URL}w300${like.poster_path}`}
          alt={like.title}
        />
        <button
          className="like__removeBtn"
          onClick={() => {
            onClickDelete(like.id, like.userFrom);
          }}
        >
          <TiDeleteOutline></TiDeleteOutline>
        </button>
      </li>
    );
  });

  console.log("likes: ", likes)

  return (
    <section className="likePage__container">
      <h2 className="likePage__title">MY LIST</h2>
      {/* {renderLikes} */}
      <ul className="like__lists">
        {likes.map((like) => (
          <Card page={like} key={like.id} type={like.type}></Card>
          
          ))} 
      </ul>
    </section>
  );
}

export default LikePage;
