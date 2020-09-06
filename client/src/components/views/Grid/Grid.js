import React from 'react';
import './Grid.scss';
import { IMAGE_BASE_URL } from '../../Config';
import NoImage from '../utils/NoImage';

function Grid(props) {
  return (
    <section className="grid__container">
      {props.movies.map((movie, index) => (
        <a className="grid__item" href={`/movie/${movie.id}`} key={index}>
          {movie.poster_path ? (
            <img
              className="grid__images"
              src={`${IMAGE_BASE_URL}w300${movie.poster_path}`}
              alt={movie.title}
            />
          ) : (
            <NoImage name={movie.title}></NoImage>
          )}
        </a>
      ))}
    </section>
  );
}

export default Grid;
