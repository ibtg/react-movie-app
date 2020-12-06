import React, { useEffect, useState } from 'react';
import Axios from 'axios';
import './Like.scss';
import { BsPlus } from 'react-icons/bs';
import { useRef } from 'react';

function Like({userFrom, id, title}) {
  // const movieId = props.movieId;
  // const userFrom = props.userFrom;
  // const movieTitle = props.movieInfo.title;
  // const moviePost = props.movieInfo.poster_path;
  // const movieRunTime = props.movieInfo.runtime;
  // const movieId = id;
  // const userFrom = userFrom;
  // const movieTitle = title;

  const [LikedNumber, setLikedNumber] = useState(0);
  const [Liked, setLiked] = useState(false);
  const buttonRef = useRef()

  let variables = {
    userFrom: userFrom,
    movieId: id,
    movieTitle: title,
    // moviePost: moviePost,
    // movieRunTime: movieRunTime,
  };

  useEffect(() => {
    Axios.post('/api/like/likeNumber', variables).then((response) => {
      if (response.data.success) {
        setLikedNumber(response.data.likeNumber);
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
      // if like button is clicked
      Axios.post('/api/like/removeFromLiked', variables).then((response) => {
        if (response.data.success) {
          setLikedNumber(LikedNumber - 1);
          setLiked(!Liked);
        } else {
          alert('Falied to remove in Like list');
        }
      });
    } else {
      // if like button is not clicked
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
      {Liked ?
      <button className="like__buttonOn like__button" onClick={onClickLiked}>
        <BsPlus></BsPlus> 
        <span className="like__buttonText">MY LIST</span>
      </button>:
      <button className="like__button" onClick={onClickLiked}>
        <BsPlus></BsPlus>
        <span className="like__buttonText">MY LIST</span>
      </button>
      }

      {Liked ? <span className="like__numbers">{LikedNumber} User like this contents</span> : ''}
    </div>
  );
}

export default Like;
