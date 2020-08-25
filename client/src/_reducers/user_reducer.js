import { LOGIN_USER, REGISTER_USER, AUTH_USER } from '../_actions/types';

export default function (state = {}, action) {
  switch (action.type) {
    case LOGIN_USER:
      console.log('LOGIN_USER :', action.payload);
      console.log('return: ', { ...state, loginSuccess: action.payload });
      return { ...state, loginSuccess: action.payload };
      break;
    default:
      return state;
  }
}
