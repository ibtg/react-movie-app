import React, { useState, useEffect } from 'react';
import { withRouter } from 'react-router-dom';
import { API_URL, API_KEY } from '../../Config';
import './SearchMovie.scss';
import Slider from '../Slider/Slider'

function SearchMovie(props) {
  const [contents, setContents] = useState([]);
  const contentsTitle = props.match.params.movieTitle;
  useEffect(() => {
    const endpoint = `${API_URL}search/movie?api_key=${API_KEY}&languate=en-US&query=${contentsTitle}`;
    fetchMovies(endpoint);
  }, [contentsTitle]);

  const fetchMovies = (endpoint) => {
    fetch(endpoint)
      .then((response) => response.json())
      .then((response) => {
        setContents([...response.results]);
      });
  };

  return (
    <div className="search__container">
      <h2 className="search__title">Search results for "{contentsTitle}"</h2>
      <ul className="search__lists">
        <Slider pages={contents}></Slider>
      </ul>
    </div>
  );
}

export default withRouter(SearchMovie);
