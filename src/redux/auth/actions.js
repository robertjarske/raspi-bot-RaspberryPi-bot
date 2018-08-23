import {
  REQUEST_AUTH_START,
  REQUEST_AUTH_SUCCESS,
  REQUEST_AUTH_FAIL,
  REQUEST_LOGOUT_START,
  REQUEST_LOGOUT_SUCCESS,
  REQUEST_LOGOUT_FAIL,
} from './constants';

import { handleResponse } from '../../utils/handleResponse';

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
export const requestLogoutSuccess = res => ({
  type: REQUEST_LOGOUT_SUCCESS,
  payload: res,
});
export const requestLogoutFail = err => ({
  type: REQUEST_LOGOUT_FAIL,
  payload: err,
});

export const requestAuth = credentials => (dispatch) => {
  dispatch(requestAuthStart());

  fetch(`${process.env.REACT_APP_API_URL}/auth/login`, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify(credentials),
  })
    .then(handleResponse)
    .then(data => dispatch(requestAuthSuccess(data)))
    .catch(err => dispatch(requestAuthFail(err)));
};

export const verifyAuth = () => (dispatch) => {
  dispatch(requestAuthStart());

  fetch(`${process.env.REACT_APP_API_URL}/api/auth`, {
    credentials: 'include',
  })
    .then(handleResponse)
    .then(data => dispatch(requestAuthSuccess(data)))
    .catch(err => dispatch(requestAuthFail(err)));
};

export const requestLogout = () => (dispatch) => {
  dispatch(requestLogoutStart());

  fetch(`${process.env.REACT_APP_API_URL}/api/auth/logout`, {
    method: 'GET',
    credentials: 'include',
    headers: {
      'Content-Type': 'application/json',
    },
  })
    .then(handleResponse)
    .then(res => dispatch(requestLogoutSuccess(res)))
    .catch(err => dispatch(requestLogoutFail(err)));
};
