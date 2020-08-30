import React from 'react';
import { IMAGE_BASE_URL } from '../../Config';
import './MovieInfo.scss';

function MovieInfo(props) {
  console.log(props.movieInfo);
  console.log(props.movieInfo.genres);
  console.log(props.movieInfo.genres[0]);
  console.log(props.movieInfo.genres[0].name);

  props.movieInfo.genres.map((movie, index) => console.log(movie.name));

  return (
    <div className="movieInfo__container">
      <img
        className="movieInfo__image"
        src={
          props.movieInfo.poster_path
            ? `${IMAGE_BASE_URL}w300${props.movieInfo.poster_path}`
            : 'No Image'
        }
        alt={props.movieInfo.title}
      />
      <div className="movieInfo__contents">
        <h3>{props.movieInfo.title}</h3>
        <p>{props.movieInfo.overview}</p>
        <div>Running Time: {props.movieInfo.runtime}</div>
        <div>Release Date: {props.movieInfo.release_date}</div>
        {props.movieInfo.genres.map((movie, index) => (
          <span key={index}>{movie.name}</span>
        ))}
      </div>
    </div>
  );
}

export default MovieInfo;
