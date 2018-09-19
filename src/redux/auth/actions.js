import {
  REQUEST_AUTH_START,
  REQUEST_AUTH_SUCCESS,
  REQUEST_AUTH_FAIL,
  REQUEST_LOGOUT_START,
  REQUEST_LOGOUT_SUCCESS,
} from './constants';

import { curriedApiCall } from '../../utils/apiCall';

const authApiCall = curriedApiCall(`${process.env.REACT_APP_API_URL}/auth`);

export const requestAuthStart = () => ({ type: REQUEST_AUTH_START });
export const requestAuthSuccess = data => ({
  type: REQUEST_AUTH_SUCCESS,
  payload: data,
});
export const requestAuthFail = err => ({
  type: REQUEST_AUTH_FAIL,
  payload: err,
});

export const requestLogoutStart = () => ({ type: REQUEST_LOGOUT_START });
export const requestLogoutSuccess = notification => ({
  type: REQUEST_LOGOUT_SUCCESS,
  payload: notification,
});

export const requestLogin = credentials => (dispatch) => {
  dispatch(requestAuthStart());

  authApiCall('login', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify(credentials),
  })
    .then((data) => {
      localStorage.setItem('token', data.token);
      dispatch(requestAuthSuccess(data));
    })
    .catch(err => dispatch(requestAuthFail(err)));
};

export const requestSignup = credentials => (dispatch) => {
  dispatch(requestAuthStart());

  authApiCall('register', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify(credentials),
  })
    .then((data) => {
      localStorage.setItem('token', data.token);
      dispatch(requestAuthSuccess(data));
    })
    .catch(err => dispatch(requestAuthFail(err)));
};

export const requestCurrentUser = token => (dispatch) => {
  dispatch(requestAuthStart());

  authApiCall('me', {
    method: 'GET',
    headers: {
      'Content-Type': 'application/json',
      'x-access-token': token,
    },
  }).then(data => dispatch(requestAuthSuccess(data)))
    .catch(err => dispatch(requestAuthFail(err)));
};

export const requestLogout = () => (dispatch) => {
  dispatch(requestLogoutStart());
  localStorage.removeItem('token');
  dispatch(requestLogoutSuccess({ msg: 'You successfully signed out', msgType: 'success' }));
};
