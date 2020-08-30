import React, { useState, useEffect, Fragment } from 'react';
import axios from 'axios';
import { withRouter } from 'react-router-dom';
import { API_URL, API_KEY, IMAGE_BASE_URL } from '../../Config';
import Grid from '../Grid/Grid';
import './LandingPage.scss';

function LandingPage(props) {
  const [Movies, setMovies] = useState([]);
  const [CurrentPage, setCurrentPage] = useState(0);

  useEffect(() => {
    const endpoint = `${API_URL}movie/popular?api_key=${API_KEY}&languate=en-US&page=1`;
    fetchMovies(endpoint);
  }, []);

  const fetchMovies = (endpoint) => {
    fetch(endpoint)
      .then((response) => response.json())
      .then((response) => {
        // console.log('movie response: ', response);
        setMovies([...Movies, ...response.results]);
        setCurrentPage(response.page);
      });
  };

  console.log('MOVIES: ', Movies);
  const onClickHandler = () => {};

  return (
    <Fragment>
      <h2 className="movie__category">Popular Movie Lists</h2>
      {Movies && <Grid movies={Movies}></Grid>}
    </Fragment>
    // <section>
    //   {Movies &&
    //     Movies.map((movie, index) => (
    //       <Grid
    //         movies={Movies}
    //         key={index}
    //         image={
    //           movie.poster_path
    //             ? `${IMAGE_BASE_URL}w300${movie.poster_path}`
    //             : null
    //         }
    //         movieName={movie.original_title}
    //         movieId={movie.id}
    //       ></Grid>
    //     ))}
    // </section>
  );
}

export default withRouter(LandingPage);
