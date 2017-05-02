import axios from 'axios';
import { browserHistory } from 'react-router';
import { AUTH_USER, UNAUTH_USER, AUTH_ERROR }  from './types';

const ROOT_URL = 'http://localhost:3090';

export function signinUser({ email, password }) {

  // Using redux thunk - it gives us access to the dispatch method and allows
  // us to call the dispatch method whenever we are done doing whatever we
  // need to do. Then, the reducers will get called. When you use reduxThunk,
  // you return a function rather than an action.
  return function (dispatch) {
    //Submit email/password to server
    axios.post(`${ROOT_URL}/signin`, { email, password })
      .then(response => {
        // If request is good...
        // - Update state to indicate user is authenticated
        dispatch({type: AUTH_USER});
        // - Save the JWT token
        localStorage.setItem('token', response.data.token);
        // - rediret to route ''/feature'
        browserHistory.push('/feature');

      })
      .catch(() => {
        //If request is bad
        // - Show an error to the user
        dispatch(authError('Bad Login Info'));

      });
  };

}

export function authError(error){
  return {
    type: AUTH_ERROR,
    payload: error
  };
}

export function signoutUser(){
  localStorage.removeItem('token');
  return {
    type: UNAUTH_USER
  };
}
