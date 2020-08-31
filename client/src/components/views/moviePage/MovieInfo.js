import React from 'react';
import { IMAGE_BASE_URL } from '../../Config';
import './MovieInfo.scss';

function MovieInfo(props) {
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
        <h3 className="movieInfo__title">{props.movieInfo.title}</h3>
        <span className="movieInfo__genres">
          Genres:
          {props.movieInfo.genres.map((movie, index) => (
            <span key={index}> {movie.name}</span>
          ))}
        </span>
        <div>Running Time: {props.movieInfo.runtime}</div>
        <div>Release Date: {props.movieInfo.release_date}</div>
        <p className="movieInfo__overview">{props.movieInfo.overview}</p>
      </div>
    </div>
  );
}

export default MovieInfo;
