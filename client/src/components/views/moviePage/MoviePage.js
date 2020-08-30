import React, { useEffect, useState, Fragment } from 'react';
import { API_URL, API_KEY, IMAGE_BASE_URL } from '../../Config';
import MovieInfo from './MovieInfo';
import Grid from '../Grid/Grid';

function MoviePage(props) {
  let movieId = props.match.params.movieId;
  const [Movie, setMovie] = useState([]);
  const [Casts, setCasts] = useState([]);

  useEffect(() => {
    let endpointCrew = `${API_URL}movie/${movieId}/credits?api_key=${API_KEY}`;
    let endpointInfo = `${API_URL}movie/${movieId}?api_key=${API_KEY}`;

    fetch(endpointInfo)
      .then((response) => response.json())
      .then((response) => {
        // console.log('response', response);
        setMovie(response);
      });

    fetch(endpointCrew)
      .then((response) => response.json())
      .then((response) => {
        //console.log('response for Crew', response);
        setCasts(response.cast);
      });
  }, []);

  // console.log('Movie: ', Movie);
  // console.log('Casts: ', Casts);

  return (
    <Fragment>{Movie && <MovieInfo movieInfo={Movie}></MovieInfo>}</Fragment>
  );
}

export default MoviePage;