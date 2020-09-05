import React, { useEffect, useState } from 'react';
import Axios from 'axios';
import { IMAGE_BASE_URL } from '../../Config';

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
        console.log(response.data);
        console.log(response.data.likes);
        setLikes(response.data.likes);
      } else {
        alert('영화 정보를 가져오는데 실패했습니다');
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
        alert('리스트에서 지우는데 실패했습니다');
      }
    });
  };

  const renderLikes = likes.map((like, index) => {
    return (
      <li key={index}>
        <span>{like.movieTitle}</span>
        <span>{like.movieRunTime}</span>
        <button
          onClick={() => {
            onClickDelete(like.movieId, like.userFrom);
          }}
        >
          remove
        </button>
      </li>
    );
  });

  return (
    <div style={{ width: '85%', margin: '3rem auto' }}>
      <h2>FavoritePage</h2>
      <ul>{renderLikes}</ul>
    </div>
  );
}

export default LikePage;
