import React, { useEffect, useState } from 'react';
import Axios from 'axios';
import './Like.scss';
import { AiOutlineLike, AiFillLike } from 'react-icons/ai';

function Like(props) {
  const movieId = props.movieId;
  const userFrom = props.userFrom;
  const movieTitle = props.movieInfo.title;
  const moviePost = props.movieInfo.poster_path;
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
        setLiked(response.data.liked);
      } else {
        alert('Faild to get information');
      }
    });
  }, []);

  const onClickLiked = () => {
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
          setLikedNumber(LikedNumber + 1);
          setLiked(!Liked);
        } else {
          alert('Failed to add Like list');
        }
      });
    }
  };

  return (
    <div className="like__container">
      <button className="like__button" onClick={onClickLiked}>
        {Liked ? <AiFillLike></AiFillLike> : <AiOutlineLike></AiOutlineLike>}
      </button>
      <span>{LikedNumber}</span>
    </div>
  );
}

export default Like;
