import React, { useState } from 'react';
import { useSelector } from 'react-redux';
import { withRouter } from 'react-router-dom';
import axios from 'axios';
import './Navbar.scss';

function Navbar(props) {
  const [visible, setVisible] = useState(false);
  const user = useSelector((state) => state.user);

  const onSignOutHandler = () => {
    axios.get('/api/users/logout').then((response) => {
      if (response.status === 200) {
        props.history.push('/login');
      } else {
        alert('Sign Out Failed');
      }
    });
  };

  const onClickVisible = () => {
    visible === true ? setVisible(false) : setVisible(true);
  };
  // if (user.userData && !user.userData.isAuth)
  console.log('user.userData: ', user.userData);

  // Sign Out State
  if (user.userData && !user.userData.isAuth) {
    return (
      <nav className="navbar__container">
        <a href="/" className="navbar__title">
          TMDB
        </a>

        <div className="navbar__control">
          <a href="/login">Sign In</a>
          <a href="/register">Sign Up</a>
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
        <div className="navbar__control">
          <a href="/" onClick={onSignOutHandler}>
            Sign Out
          </a>
        </div>
      </nav>
    );
  }
}

export default withRouter(Navbar);
