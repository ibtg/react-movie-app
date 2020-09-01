import React, { useState } from 'react';
import { useSelector } from 'react-redux';
import { withRouter } from 'react-router-dom';
import axios from 'axios';
import './Navbar.scss';
import Grid from '../Grid/Grid';
import { API_URL, API_KEY, IMAGE_BASE_URL } from '../../Config';

function Navbar(props) {
  // const [visible, setVisible] = useState(false);
  const user = useSelector((state) => state.user);
  const [Search, setSearch] = useState('');
  const onSignOutHandler = () => {
    axios.get('/api/users/logout').then((response) => {
      if (response.status === 200) {
        props.history.push('/login');
      } else {
        alert('Sign Out Failed');
      }
    });
  };

  // const onClickVisible = () => {
  //   visible === true ? setVisible(false) : setVisible(true);
  // };

  const onInputChange = (event) => {
    setSearch(event.target.value);
  };

  // const onInputSubmit = (event) => {
  //   event.preventDefault();
  //   console.log(Search);

  //   const endpoint = `${API_URL}search/movie?api_key=${API_KEY}&languate=en-US&query=${Search}&page=1`;
  //   console.log(endpoint);

  //   const fetchMovies = (endpoint) => {
  //     fetch(endpoint)
  //       .then((response) => response.json())
  //       .then((response) => {
  //         // console.log('movie response: ', response);
  //         setMovies([...Movies, ...response.results]);
  //         // console.log('page: ', response.page);
  //         setCurrentPage(response.page + 1);
  //         // console.log('page: ', CurrentPage);
  //       });
  //   };
  // };
  // console.log('user.userData: ', user.userData);

  // Sign Out State
  if (user.userData && !user.userData.isAuth) {
    return (
      <nav className="navbar__container">
        <a href="/" className="navbar__title">
          TMDB
        </a>
        <form onSubmit={props.onInputSubmit} className="navbar__form">
          <input
            // type="submit"
            className="navbar__input"
            placeholder=" Search keywords"
            value={Search}
            onChange={onInputChange}
          ></input>
        </form>

        <div className="navbar__control">
          <button className="navbar__button">
            <a href="/login">Sign In</a>
          </button>
          <button className="navbar__button">
            <a href="/register">Sign Up</a>
          </button>
        </div>
      </nav>
    );
  } else {
    // Sign In State
    return (
      <nav className="navbar__container">
        <a href="/" className="navbar__title">
          TMDB
        </a>
        <form onSubmit={props.onInputSubmit} className="navbar__form">
          <input
            // type="submit"
            className="navbar__input"
            placeholder=" Search keywords"
            value={Search}
            onChange={onInputChange}
          ></input>
        </form>
        <div className="navbar__control">
          <button className="navbar__button" onClick={onSignOutHandler}>
            <a href="/">Sign Out</a>
          </button>
        </div>
      </nav>
    );
  }
}

export default withRouter(Navbar);
