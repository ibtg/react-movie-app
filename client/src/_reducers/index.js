import { combineReducers } from 'redux';
import user from './user_reducer'; // reducer for users

const rootReducer = combineReducers({
  user,
});

export default rootReducer;
