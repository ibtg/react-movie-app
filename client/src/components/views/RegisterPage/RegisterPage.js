import React, { useState, useEffect } from 'react';
import { useDispatch } from 'react-redux';
import { withRouter } from 'react-router-dom';
import { registerUser } from '../../../_actions/user_action';

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
    <div>
      <form onSubmit={onSubmitHandler}>
        <label htmlFor="Email">Email</label>
        <input
          type="email"
          id="Email"
          value={Email}
          onChange={onEmailHandler}
        />

        <label htmlFor="Name">Name</label>
        <input type="text" id="Name" value={Name} onChange={onNameHandler} />

        <label htmlFor="Password">Password</label>
        <input
          type="password"
          id="Password"
          value={Password}
          onChange={onPasswordHandler}
        />

        <label htmlFor="Confirm">Confirm Password</label>
        <input
          type="password"
          id="Confirm"
          value={ConfirmPassword}
          onChange={onConfirmPasswordHandler}
        />

        <button type="submit">Sign Up</button>
      </form>
    </div>
  );
}

export default withRouter(RegisterPage);
