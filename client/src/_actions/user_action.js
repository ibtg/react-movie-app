import { LOGIN_USER, REGISTER_USER, AUTH_USER } from './types';
import axios from 'axios';

// auth
export function auth() {
  const request = axios
    .get('/api/users/auth')
    .then((response) => response.data);

  return {
    type: AUTH_USER,
    payload: request,
  };
}

// login
export function loginUser(dataTosubmit) {
  const request = axios
    .post('/api/users/login', dataTosubmit)
    .then((response) => response.data);
  request.then((pay) => console.log('Request: ', pay));

  return {
    type: LOGIN_USER,
    payload: request,
  };
}

// register
export function registerUser(dataToSubmit) {
  const request = axios
    .post('/api/users/register', dataToSubmit)
    .then((response) => response.data);

  return {
    type: REGISTER_USER,
    payload: request,
  };
}
