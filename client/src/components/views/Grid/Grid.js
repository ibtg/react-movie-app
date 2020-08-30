import React from 'react';
import './Grid.scss';
import { IMAGE_BASE_URL } from '../../Config';

function Grid(props) {
  return (
    <section className="grid__container">
      {props.movies.map((movie, index) => (
        <img
          key={index}
          className="grid__images"
          src={
            movie.poster_path
              ? `${IMAGE_BASE_URL}w300${movie.poster_path}`
              : 'No Images'
          }
          alt={movie.title}
        />
      ))}
    </section>
  );
}

export default Grid;
