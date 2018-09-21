import {
  REQUEST_ALIVE_START,
  REQUEST_ALIVE_SUCCESS,
  REQUEST_ALIVE_FAIL,
  REQUEST_ROBOTS_START,
  REQUEST_ROBOTS_SUCCESS,
  REQUEST_ROBOTS_FAIL,
} from './constants';

import { curriedApiCall } from '../../utils/apiCall';


const robotApiCall = curriedApiCall(`${process.env.REACT_APP_API_URL}/robots`);

/** Get all users(admin) */
export const requestAliveStart = () => ({ type: REQUEST_ALIVE_START });

export const requestAliveSuccess = data => ({
  type: REQUEST_ALIVE_SUCCESS,
  payload: data,
});

export const requestAliveFail = err => ({
  type: REQUEST_ALIVE_FAIL,
  payload: err,
});

export const requestAlive = robot => (dispatch) => {
  dispatch(requestAliveStart());

  fetch(`${robot.url}/alive`, {
    method: 'GET',
    headers: {
      'Content-Type': 'application/json',
    },
  })
    .then(res => res.json())
    .then(res => dispatch(requestAliveSuccess(res)))
    .catch(err => dispatch(requestAliveFail({ err, robot })));
};

export const requestRobotsStart = () => ({ type: REQUEST_ROBOTS_START });

export const requestRobotsSuccess = data => ({
  type: REQUEST_ROBOTS_SUCCESS,
  payload: data,
});

export const requestRobotsFail = err => ({
  type: REQUEST_ROBOTS_FAIL,
  payload: err,
});

export const requestRobots = () => (dispatch) => {
  dispatch(requestRobotsStart());

  robotApiCall('/', {
    method: 'GET',
    headers: {
      'Content-Type': 'application/json',
      'x-access-token': localStorage.getItem('token'),
    },
  })
    .then(data => dispatch(requestRobotsSuccess(data)))
    .catch(err => dispatch(requestRobotsFail(err)));
};

// export const requestMakeUnavailableStart = () => ({ type: REQUEST_ROBOTS_START });

// export const requestMakeUnavailableSuccess = data => ({
//   type: REQUEST_ROBOTS_SUCCESS,
//   payload: data,
// });

// export const requestMakeUnavailableFail = err => ({
//   type: REQUEST_ROBOTS_FAIL,
//   payload: err,
// });

export const requestMakeUnavailable = id => (dispatch) => {
  robotApiCall(`/${id}`, {
    method: 'PUT',
    headers: {
      'Content-Type': 'application/json',
      'x-access-token': localStorage.getItem('token'),
    },
    body: JSON.stringify({ isAvailable: false }),
  })
    .then((res) => {
      console.log(res);
    })
    .catch((err) => {
      console.log(err);
    });
};

export const requestMakeAvailable = id => (dispatch) => {
  robotApiCall(`/${id}`, {
    method: 'PUT',
    headers: {
      'Content-Type': 'application/json',
      'x-access-token': localStorage.getItem('token'),
    },
    body: JSON.stringify({ isAvailable: true }),
  })
    .then((res) => {
      console.log(res);
    })
    .catch((err) => {
      console.log(err);
    });
};
