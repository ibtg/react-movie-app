import React, { useState, useEffect } from 'react';
import { withRouter } from 'react-router-dom';
import { API_URL, API_KEY } from '../../Config';
import Grid from '../Grid/Grid';
import './LandingPage.scss';
import { MdKeyboardArrowDown } from 'react-icons/md';

function LandingPage(props) {
  const [Movies, setMovies] = useState([]);
  const [CurrentPage, setCurrentPage] = useState(3);

  useEffect(() => {
    const endpoint1 = `${API_URL}movie/popular?api_key=${API_KEY}&languate=en-US&page=1`;
    const results1 = fetchMovies(endpoint1).then((response) => {
      return response.results;
    });

    const endpoint2 = `${API_URL}movie/popular?api_key=${API_KEY}&languate=en-US&page=2`;
    const results2 = fetchMovies(endpoint2).then((response) => {
      return response.results;
    });

    Promise.all([results1, results2]).then((results) => {
      let resultArr = [];
      results.map((result) => {
        resultArr = [...resultArr, ...result];
      });
      setMovies([...Movies, ...resultArr]);
    });
  }, []);

  const loadMoreItems = () => {
    const endpoint = `${API_URL}movie/popular?api_key=${API_KEY}&languate=en-US&page=${CurrentPage}`;
    fetchMovies(endpoint).then((response) => {
      setMovies([...Movies, ...response.results]);
      setCurrentPage(response.page + 1);
    });
  };

  const fetchMovies = async (endpoint) => {
    const response = await fetch(endpoint).then((response) => response.json());
    return response;
  };

  return (
    <div className="container">
      {/* <h2 className="movie__category">Popular Movie Lists</h2> */}
      {Movies.length !== 0 && <Grid movies={Movies}></Grid>}
      <div className="movie__buttonContainer">
        <button className="movie__button" onClick={loadMoreItems}>
          <MdKeyboardArrowDown
            style={{ width: '100%', height: '40px' }}
          ></MdKeyboardArrowDown>
        </button>
      </div>
    </div>
  );
}

export default withRouter(LandingPage);
