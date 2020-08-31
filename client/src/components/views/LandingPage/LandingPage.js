import React, { useState, useEffect } from 'react';
import { withRouter } from 'react-router-dom';
import { API_URL, API_KEY, IMAGE_BASE_URL } from '../../Config';
import Grid from '../Grid/Grid';
import './LandingPage.scss';
import { MdKeyboardArrowDown } from 'react-icons/md';

function LandingPage(props) {
  const [Movies, setMovies] = useState([]);
  const [CurrentPage, setCurrentPage] = useState(1);

  useEffect(() => {
    const endpoint = `${API_URL}movie/popular?api_key=${API_KEY}&languate=en-US&page=1`;
    fetchMovies(endpoint);
  }, []);

  const loadMoreItems = () => {
    // console.log('Load More');
    // console.log('Load Page: ', CurrentPage);
    //setCurrentPage(CurrentPage + 1);
    const endpoint = `${API_URL}movie/popular?api_key=${API_KEY}&languate=en-US&page=${CurrentPage}`;
    fetchMovies(endpoint);
  };

  const fetchMovies = (endpoint) => {
    fetch(endpoint)
      .then((response) => response.json())
      .then((response) => {
        // console.log('movie response: ', response);
        setMovies([...Movies, ...response.results]);
        // console.log('page: ', response.page);
        setCurrentPage(response.page + 1);
        // console.log('page: ', CurrentPage);
      });
  };

  return (
    <div className="re">
      <h2 className="movie__category">Popular Movie Lists</h2>
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
