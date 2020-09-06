import React, { useState, useEffect } from 'react';
import { withRouter } from 'react-router-dom';
import { API_URL, API_KEY } from '../../Config';
import Grid from '../Grid/Grid';
import './LandingPage.scss';
import { MdKeyboardArrowDown } from 'react-icons/md';

function LandingPage(props) {
  const [Movies, setMovies] = useState([]);
  const [CurrentPage, setCurrentPage] = useState(1);
  const [visible, setVisible] = useState(true);

  useEffect(() => {
    const endpoint = `${API_URL}movie/popular?api_key=${API_KEY}&languate=en-US&page=1`;
    fetchMovies(endpoint).then((response) => {
      console.log(response);
      setMovies([...Movies, ...response.results]);
      setCurrentPage(response.page + 1);
    });
  }, []);

  const loadMoreItems = () => {
    const endpoint = `${API_URL}movie/popular?api_key=${API_KEY}&languate=en-US&page=${CurrentPage}`;
    fetchMovies(endpoint).then((response) => {
      setMovies([...Movies, ...response.results]);
      setCurrentPage(response.page + 1);
    });
  };

  const fetchMovies = (endpoint) => {
    const response = fetch(endpoint).then((response) => response.json());
    return response;
  };

  return (
    <div className="container">
      {/* <h2 className="movie__category">Popular Movie Lists</h2> */}
      {Movies.length !== 0 && <Grid movies={Movies}></Grid>}
      {visible && (
        <div className="movie__buttonContainer">
          <button className="movie__button" onClick={loadMoreItems}>
            <MdKeyboardArrowDown
              style={{ width: '100%', height: '40px' }}
            ></MdKeyboardArrowDown>
          </button>
        </div>
      )}
    </div>
  );
}

export default withRouter(LandingPage);
