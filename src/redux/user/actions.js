import {
  REQUEST_UPDATE_USER_START,
  REQUEST_UPDATE_USER_SUCCESS,
  REQUEST_UPDATE_USER_FAIL,
  REQUEST_ADMIN_UPDATE_USER_START,
  REQUEST_ADMIN_UPDATE_USER_SUCCESS,
  REQUEST_ADMIN_UPDATE_USER_FAIL,
  REQUEST_USERS_START,
  REQUEST_USERS_SUCCESS,
  REQUEST_USERS_FAIL,
  REQUEST_USER_CREATE_START,
  REQUEST_USER_CREATE_SUCCESS,
  REQUEST_USER_CREATE_FAIL,
  REQUEST_USER_DELETE_START,
  REQUEST_USER_DELETE_SUCCESS,
  REQUEST_USER_DELETE_FAIL,
  REQUEST_SEARCH_START,
  REQUEST_SEARCH_SUCCESS,
  REQUEST_SEARCH_FAIL,
} from './constants';

import { curriedApiCall } from '../../utils/apiCall';

const userApiCall = curriedApiCall(`${process.env.REACT_APP_API_URL}/users`);

/** Get all users(admin) */
export const requestUsersStart = () => ({ type: REQUEST_USERS_START });

export const requestUsersSuccess = data => ({
  type: REQUEST_USERS_SUCCESS,
  payload: data,
});

export const requestUsersFail = err => ({
  type: REQUEST_USERS_FAIL,
  payload: err,
});

export const requestUsers = () => (dispatch) => {
  dispatch(requestUsersStart());

  userApiCall('/', {
    method: 'GET',
    headers: {
      'Content-Type': 'application/json',
      'x-access-token': localStorage.getItem('currentUser'),
    },
  })
    .then(data => dispatch(requestUsersSuccess(data)))
    .catch(err => dispatch(requestUsersFail(err)));
};

/** Create new user(admin) */
export const requestUserCreateStart = () => ({ type: REQUEST_USER_CREATE_START });

export const requestUserCreateSuccess = data => ({
  type: REQUEST_USER_CREATE_SUCCESS,
  payload: data,
});

export const requestUserCreateFail = err => ({
  type: REQUEST_USER_CREATE_FAIL,
  payload: err,
});

export const requestUserCreate = userData => (dispatch) => {
  dispatch(requestUserCreateStart());

  userApiCall('/', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
      'x-access-token': localStorage.getItem('currentUser'),
    },
    body: JSON.stringify(userData),
  })
    .then(data => dispatch(requestUserCreateSuccess(data)))
    .catch(err => requestUserCreateFail(err));
};

/** Delete User(admin) */
export const requestUserDeleteStart = () => ({ type: REQUEST_USER_DELETE_START });

export const requestUserDeleteSuccess = data => ({
  type: REQUEST_USER_DELETE_SUCCESS,
  payload: data,
});

export const requestUserDeleteFail = err => ({
  type: REQUEST_USER_DELETE_FAIL,
  payload: err,
});

export const requestUserDelete = userData => (dispatch) => {
  dispatch(requestUserDeleteStart());

  userApiCall(`/${userData._id}`, {
    method: 'DELETE',
    headers: {
      'Content-Type': 'application/json',
      'x-access-token': localStorage.getItem('currentUser'),
    },
    body: JSON.stringify(userData),
  })
    .then(data => dispatch(requestUserDeleteSuccess(data)))
    .catch(err => requestUserDeleteFail(err));
};


/** Update User(self) */
export const requestUserUpdateStart = () => ({ type: REQUEST_UPDATE_USER_START });

export const requestUserUpdateSuccess = data => ({
  type: REQUEST_UPDATE_USER_SUCCESS,
  payload: data,
});

export const requestUserUpdateFail = err => ({
  type: REQUEST_UPDATE_USER_FAIL,
  payload: err,
});


export const requestUserUpdate = userData => (dispatch) => {
  dispatch(requestUserUpdateStart());

  userApiCall(userData.id, {
    method: 'PUT',
    headers: {
      'Content-Type': 'application/json',
      'x-access-token': localStorage.getItem('currentUser'),
    },
    body: JSON.stringify(userData),
  })
    .then(data => dispatch(requestUserUpdateSuccess(data)))
    .catch(err => dispatch(requestUserUpdateFail(err)));
};

/** Update User(admin) */
export const requestAdminUserUpdateStart = () => ({ type: REQUEST_ADMIN_UPDATE_USER_START });

export const requestAdminUserUpdateSuccess = data => ({
  type: REQUEST_ADMIN_UPDATE_USER_SUCCESS,
  payload: data,
});

export const requestAdminUserUpdateFail = err => ({
  type: REQUEST_ADMIN_UPDATE_USER_FAIL,
  payload: err,
});


export const requestAdminUserUpdate = userData => (dispatch) => {
  dispatch(requestAdminUserUpdateStart());

  userApiCall(`/${userData.id}`, {
    method: 'PUT',
    headers: {
      'Content-Type': 'application/json',
      'x-access-token': localStorage.getItem('currentUser'),
    },
    body: JSON.stringify(userData),
  })
    .then(data => dispatch(requestAdminUserUpdateSuccess(data)))
    .catch(err => dispatch(requestAdminUserUpdateFail(err)));
};


/** Search */

export const requestSearchStart = () => ({ type: REQUEST_SEARCH_START });
export const requestSearchSuccess = data => ({
  type: REQUEST_SEARCH_SUCCESS,
  payload: data,
});

export const requestSearchFail = err => ({
  type: REQUEST_SEARCH_FAIL,
  payload: err,
});

export const requestSearch = query => (dispatch) => {
  dispatch(requestSearchStart());
  userApiCall('/search', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
      'x-access-token': localStorage.getItem('currentUser'),
    },
    body: JSON.stringify({ query }),
  })
    .then(users => dispatch(requestSearchSuccess(users)))
    .catch(err => dispatch(requestSearchFail(err)));
};
