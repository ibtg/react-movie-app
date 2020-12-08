import React, { useState } from 'react';
import { useSelector } from 'react-redux';
import { withRouter } from 'react-router-dom';
import axios from 'axios';
import './Navbar.scss';
import { BiMovie } from 'react-icons/bi';

function Navbar(props) {
  const user = useSelector((state) => state.user);
  const [Search, setSearch] = useState('');

  const onSignOutHandler = () => {
    axios.get('/api/users/logout').then((response) => {
      if (response.status === 200) {
        localStorage.removeItem('userId');
        props.history.push('/');
      } else {
        alert('Sign Out Failed');
      }
    });
  };

  const onInputChange = (event) => {
    setSearch(event.target.value);
  };

  const onInputSubmit = (event) => {
    event.preventDefault();
    props.history.push(`/search/${Search}`);
  };

  // Sign Out State
  if (user.userData && !user.userData.isAuth) {
    return (
      <nav className="navbar__container">
        <a href="/" className="navbar__title">
          <BiMovie></BiMovie>
          <span className="navbar__logo" >TMDB</span>
        </a>
        <form onSubmit={onInputSubmit} className="navbar__form">
          <input
            className="navbar__input"
            placeholder="Search keywords"
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
          <BiMovie></BiMovie>
          <span className="navbar__logo">TMDB</span>
        </a>
        <form onSubmit={onInputSubmit} className="navbar__form">
          <input
            className="navbar__input"
            placeholder=" Enter Movie Title"
            value={Search}
            onChange={onInputChange}
          ></input>
        </form>
        <div className="navbar__control">
          <button className="navbar__button">
            <a href="/like">My Page</a>
          </button>
          <button className="navbar__button" onClick={onSignOutHandler}>
            <a href="/">Sign Out</a>
          </button>
        </div>
      </nav>
    );
  }
}

export default withRouter(Navbar);
