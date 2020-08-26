import React, { useState } from 'react';
import { useDispatch } from 'react-redux';
import { loginUser } from '../../../_actions/user_action';
import { withRouter } from 'react-router-dom';

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
      //console.log('dispatch - response: ', response);
      if (response.payload.loginSuccess) {
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
    <div>
      <form action="" onSubmit={onSubmitHandler}>
        <label htmlFor="">Email</label>
        <input type="email" value={Email} onChange={onEmailHandler} />

        <label htmlFor="">Password</label>
        <input type="password" value={Password} onChange={onPasswordHandler} />

        <button type="submit">Login</button>
      </form>
    </div>
  );
}

export default withRouter(LoginPage);
