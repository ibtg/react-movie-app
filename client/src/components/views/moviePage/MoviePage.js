import React, { useEffect, useState } from 'react';
import { API_URL, API_KEY } from '../../Config';
import MovieInfo from './MovieInfo';
import MovieActor from './MovieActor';
import Like from './Like';
import './MoviePage.scss';

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
        setMovie(response);
      });

    fetch(endpointCrew)
      .then((response) => response.json())
      .then((response) => {
        response.cast ? setCasts(response.cast) : setCasts('undefined');
        response.crew.length === 0
          ? setDirector([{ name: 'undefined', profile_path: null }])
          : setDirector(response.crew[0]);
      });
  }, []);

  return (
    <section className="moviePage__container">
      <Like
        movieInfo={Movie}
        movieId={movieId}
        userFrom={localStorage.getItem('userId')}
      ></Like>
      {Movie.length !== 0 && <MovieInfo movieInfo={Movie}></MovieInfo>}
      {Casts.length !== 0 && (
        <MovieActor castInfo={Casts} directorInfo={Director}></MovieActor>
      )}
    </section>
  );
}

export default MoviePage;
