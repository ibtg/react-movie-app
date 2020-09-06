import React, { useState, useEffect } from 'react';
import { withRouter } from 'react-router-dom';
import { API_URL, API_KEY, IMAGE_BASE_URL } from '../../Config';
import Grid from '../Grid/Grid';
import './SearchMovie.scss';

function SearchMovie(props) {
  const [Movies, setMovies] = useState([]);
  const movieTitle = props.match.params.movieTitle;
  useEffect(() => {
    const endpoint = `${API_URL}search/movie?api_key=${API_KEY}&languate=en-US&query=${movieTitle}&page=1`;
    fetchMovies(endpoint);
  }, [movieTitle]);

  const fetchMovies = (endpoint) => {
    fetch(endpoint)
      .then((response) => response.json())
      .then((response) => {
        setMovies([...response.results]);
      });
  };

  return (
    <div className="search__container">
      {Movies.length !== 0 && <Grid movies={Movies}></Grid>}
    </div>
  );
}

export default withRouter(SearchMovie);
