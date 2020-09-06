import React from 'react';
import { IMAGE_BASE_URL } from '../../Config';
import './MovieInfo.scss';

function MovieInfo(props) {
  console.log('info: ', props);
  return (
    <div className="movieInfo__container">
      {props.movieInfo.poster_path ? (
        <img
          className="movieInfo__image"
          src={`${IMAGE_BASE_URL}w300${props.movieInfo.poster_path}`}
          alt={props.movieInfo.title}
        />
      ) : null}

      <div className="movieInfo__contents">
        <h3 className="movieInfo__title">{props.movieInfo.title}</h3>
        <span className="movieInfo__genres">
          Genres:
          {props.movieInfo.genres.map((movie, index) => (
            <span key={index}> {movie.name}</span>
          ))}
        </span>
        <div className="movieInfo__sub">
          Running Time: {props.movieInfo.runtime} min
        </div>
        <div className="movieInfo__sub">
          Release Date: {props.movieInfo.release_date}
        </div>
        <div className="movieInfo__sub">
          Vote Average: {props.movieInfo.vote_average}
        </div>
        <p className="movieInfo__overview">{props.movieInfo.overview}</p>
      </div>
    </div>
  );
}

export default MovieInfo;
