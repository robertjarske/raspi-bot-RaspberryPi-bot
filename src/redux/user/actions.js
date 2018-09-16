import {
  REQUEST_UPDATE_USER_START,
  REQUEST_UPDATE_USER_SUCCESS,
  REQUEST_UPDATE_USER_FAIL,
} from './constants';

import { curriedApiCall } from '../../utils/apiCall';

const userApiCall = curriedApiCall(`${process.env.REACT_APP_API_URL}/users`);


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
      'x-access-token': localStorage.getItem('token'),
    },
    body: JSON.stringify(userData),
  })
    .then(data => dispatch(requestUserUpdateSuccess(data)))
    .catch(err => dispatch(requestUserUpdateFail(err)));
};
