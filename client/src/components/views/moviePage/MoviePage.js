import React, { useEffect, useState, Fragment } from 'react';
import { API_URL, API_KEY, IMAGE_BASE_URL } from '../../Config';
import MovieInfo from './MovieInfo';
import MovieActor from './MovieActor';

function MoviePage(props) {
  let movieId = props.match.params.movieId;
  const [Movie, setMovie] = useState([]);
  const [Casts, setCasts] = useState([]);
  const [Director, setDirector] = useState('');

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
        setDirector(response.crew[0]);
      });
  }, []);

  // console.log('Movie: ', Movie);
  // console.log('Casts: ', Casts);

  return (
    <section style={{ backgroundColor: 'rgb(240, 240, 240)', top: '80px' }}>
      {Movie.length !== 0 && <MovieInfo movieInfo={Movie}></MovieInfo>}
      {Casts.length !== 0 && (
        <MovieActor castInfo={Casts} directorInfo={Director}></MovieActor>
      )}
    </section>
  );
}

export default MoviePage;
