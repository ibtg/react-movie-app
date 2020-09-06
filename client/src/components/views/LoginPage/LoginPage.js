import React, { useState } from 'react';
import { useDispatch } from 'react-redux';
import { loginUser } from '../../../_actions/user_action';
import { withRouter } from 'react-router-dom';
import './LoginPage.scss';

function LoginPage(props) {
  const dispatch = useDispatch();
  const [Email, setEmail] = useState('');
  const [Password, setPassword] = useState('');

  const onSubmitHandler = (event) => {
    event.preventDefault();
    let body = {
      email: Email,
      password: Password,
    };

    dispatch(loginUser(body)).then((response) => {
      console.log('dispatch - response: ', response);
      if (response.payload.loginSuccess) {
        localStorage.setItem('userId', response.payload.userId);
        props.history.push('/');
      } else {
        alert('Login Error');
      }
    });
  };

  const onPasswordHandler = (event) => {
    setPassword(event.currentTarget.value);
  };

  const onEmailHandler = (event) => {
    setEmail(event.currentTarget.value);
  };

  return (
    <div className="login__page">
      <form className="login__form" onSubmit={onSubmitHandler}>
        <label htmlFor="Email"></label>
        <input
          className="login__email"
          id="Email"
          type="email"
          value={Email}
          onChange={onEmailHandler}
          placeholder="Email"
        />

        <label htmlFor="Password"></label>
        <input
          className="login__password"
          id="Password"
          type="password"
          value={Password}
          onChange={onPasswordHandler}
          placeholder="Password"
        />

        <button className="login__button" type="submit">
          Login
        </button>
      </form>
    </div>
  );
}

export default withRouter(LoginPage);
