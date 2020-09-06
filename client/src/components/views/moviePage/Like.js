import React, { useEffect, useState } from 'react';
import Axios from 'axios';
import './Like.scss';

function Like(props) {
  const movieId = props.movieId;
  const userFrom = props.userFrom;
  const movieTitle = props.movieInfo.title;
  const moviePost = props.movieInfo.backdrop_path;
  const movieRunTime = props.movieInfo.runtime;

  const [LikedNumber, setLikedNumber] = useState(0);
  const [Liked, setLiked] = useState(false);
  let variables = {
    userFrom: userFrom,
    movieId: movieId,
    movieTitle: movieTitle,
    moviePost: moviePost,
    movieRunTime: movieRunTime,
  };

  useEffect(() => {
    Axios.post('/api/like/likeNumber', variables).then((response) => {
      if (response.data.success) {
        setLikedNumber(response.data.likeNumber);
        console.log('like: ', response.data);
      } else {
        alert('Faild to get information');
      }
    });

    Axios.post('/api/like/liked', variables).then((response) => {
      if (response.data.success) {
        console.log('like me: ', response.data);
        setLiked(response.data.liked);
      } else {
        alert('Faild to get information');
      }
    });
  }, []);

  const onClickLiked = () => {
    console.log('click: ', userFrom);
    if (userFrom === null) {
      alert('Please Sign In First');
      return;
    }

    if (Liked) {
      Axios.post('/api/like/removeFromLiked', variables).then((response) => {
        if (response.data.success) {
          setLikedNumber(LikedNumber - 1);
          setLiked(!Liked);
        } else {
          alert('Falied to remove in Like list');
        }
      });
    } else {
      Axios.post('/api/like/addToLike', variables).then((response) => {
        if (response.data.success) {
          console.log('add to like: ', response);
          setLikedNumber(LikedNumber + 1);
          console.log('Liked number: ', LikedNumber);
          setLiked(!Liked);
        } else {
          alert('Failed to add Like list');
        }
      });
    }
  };

  // 좋아하는지, -> 별 모양으로
  return (
    <div className="like__container">
      <button onClick={onClickLiked}>
        {Liked ? ' Not Liked' : 'Add to Liked '}
      </button>
      <span>Like : {LikedNumber}</span>
    </div>
  );
}

export default Like;
