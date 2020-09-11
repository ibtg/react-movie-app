import React, { useEffect } from 'react';
import { useDispatch } from 'react-redux';
import { useSelector } from 'react-redux';
import { auth } from '../_actions/user_action';

export default function (SpecificComponent, option, adminRoute = null) {
  // options
  // null for every users
  // true => for login user
  // false => user who did not login

  function AuthenticationCheck(props) {
    let user = useSelector((state) => state.user);
    const dispatch = useDispatch();

    useEffect(() => {
      dispatch(auth()).then(async (response) => {
        console.log('auth response: ', response);
        // logout state, try to access page that allowd only for login users
        if (await !response.payload.isAuth) {
          if (option === true) {
            props.history.push('/login');
          }
        } else {
          // login state
          if (adminRoute && !response.payload.isAdmin) {
            // not admin, try to access admin page
            props.history.push('/');
          } else {
            // login user try to access page that login user can not acess ex. login page, register page
            if (option === false) {
              props.history.push('/');
            }
          }
        }
      });
    }, [dispatch, props.history]);
    return <SpecificComponent {...props} user={user}></SpecificComponent>;
  }

  return AuthenticationCheck;
}
