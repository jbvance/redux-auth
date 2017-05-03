import React from 'react';
import ReactDOM from 'react-dom';
import { Provider } from 'react-redux';
import { createStore, applyMiddleware } from 'redux';
import { Router, Route, IndexRoute, browserHistory } from 'react-router';
import reduxThunk from 'redux-thunk';
import { AUTH_USER } from './actions/types';

import App from './components/app';
import Signin from './components/auth/signin';
import Signout from './components/auth/signout';
import Signup from './components/auth/signup';
import Feature from './components/Feature';
import Welcome from './components/welcome';
import RequireAuth from './components/auth/require_auth';

import reducers from './reducers';

const createStoreWithMiddleware = applyMiddleware(reduxThunk)(createStore);
const store = createStoreWithMiddleware(reducers)

//Get the token if one exists
const token = localStorage.getItem('token');
//If we have a token, consider user to be signed in
if (token) {
  //Update application state by dispatching an action via the store
  store.dispatch({ type: AUTH_USER});
}

ReactDOM.render(
  <Provider store={store}>
    <Router history={browserHistory}>
      <Route path="/" component={App}>
        <IndexRoute component={Welcome} />
        <Route path="signin" component={Signin} />
        <Route path="signout" component={Signout} />
        <Route path="signup" component={Signup} />
        <Route path="feature" component={RequireAuth(Feature)} />
      </Route>
    </Router>
  </Provider>
  , document.querySelector('.container'));
