import React, { useState } from 'react';
import { useDispatch } from 'react-redux';
import { withRouter } from 'react-router-dom';
import { registerUser } from '../../../_actions/user_action';
import './RegisterPage.scss';

function RegisterPage(props) {
  const dispatch = useDispatch();
  const [Email, setEmail] = useState('');
  const [Name, setName] = useState('');
  const [Password, setPassword] = useState('');
  const [ConfirmPassword, setConfirmPassword] = useState('');

  const onEmailHandler = (event) => {
    setEmail(event.currentTarget.value);
  };

  const onNameHandler = (event) => {
    setName(event.currentTarget.value);
  };

  const onPasswordHandler = (event) => {
    setPassword(event.currentTarget.value);
  };

  const onConfirmPasswordHandler = (event) => {
    setConfirmPassword(event.currentTarget.value);
  };

  const onSubmitHandler = (event) => {
    event.preventDefault();
    if (Password !== ConfirmPassword) {
      return alert('PassWord and Confirm Password Should Same');
    }

    let body = {
      email: Email,
      password: Password,
      name: Name,
    };

    dispatch(registerUser(body)).then((response) => {
      if (response.payload.success) {
        props.history.push('/login');
      } else {
        alert('Failed to sign up');
      }
    });
  };

  return (
    <div className="register__page">
      <form className="register__form" onSubmit={onSubmitHandler}>
        <label htmlFor="Email"></label>
        <input
          className="register__input"
          type="email"
          id="Email"
          value={Email}
          onChange={onEmailHandler}
          placeholder="Email"
        />

        <label htmlFor="Name"></label>
        <input
          className="register__input"
          type="text"
          id="Name"
          value={Name}
          onChange={onNameHandler}
          placeholder="Name"
        />

        <label htmlFor="Password"></label>
        <input
          className="register__input"
          type="password"
          id="Password"
          value={Password}
          onChange={onPasswordHandler}
          placeholder="Password (8-character minumum)"
        />

        <label htmlFor="Confirm"></label>
        <input
          className="register__input"
          type="password"
          id="Confirm"
          value={ConfirmPassword}
          onChange={onConfirmPasswordHandler}
          placeholder="Confirm Password"
        />
        <button className="register__button" type="submit">
          Sign Up
        </button>
      </form>
    </div>
  );
}

export default withRouter(RegisterPage);
