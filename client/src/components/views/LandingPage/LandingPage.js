import React, { useState, useEffect } from 'react';
import { withRouter } from 'react-router-dom';
import { API_URL, API_KEY, IMAGE_BASE_URL } from '../../Config';
import Grid from '../Grid/Grid';
import './LandingPage.scss';
import { MdKeyboardArrowDown } from 'react-icons/md';
import Navbar from '../Navbar/Navbar';

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

  const onInputSubmit = (event) => {
    event.preventDefault();
    console.log(event.target.querySelector('input').value);
    const searchKeyword = event.target.querySelector('input').value;
    const endpoint = `${API_URL}search/movie?api_key=${API_KEY}&languate=en-US&query=${searchKeyword}&page=1`;
    fetchMovies(endpoint).then((response) => {
      setMovies([...response.results]);
    });
    setVisible(false);
  };

  return (
    <div className="re">
      <h2 className="movie__category">Popular Movie Lists</h2>
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
