import {
  REQUEST_ALIVE_START,
  REQUEST_ALIVE_SUCCESS,
  REQUEST_ALIVE_FAIL,
  REQUEST_ROBOTS_START,
  REQUEST_ROBOTS_SUCCESS,
  REQUEST_ROBOTS_FAIL,
  REQUEST_ROBOT_START,
  REQUEST_ROBOT_SUCCESS,
  REQUEST_ROBOT_FAIL,
  REQUEST_UPDATE_ROBOT_START,
  REQUEST_UPDATE_ROBOT_SUCCESS,
  REQUEST_UPDATE_ROBOT_FAIL,
  REQUEST_CLEAR_ROBOT,
} from './constants';

import { curriedApiCall } from '../../utils/apiCall';


const robotApiCall = curriedApiCall(`${process.env.REACT_APP_API_URL}/robots`);

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
      'x-access-token': localStorage.getItem('currentUser'),
    },
  })
    .then(data => dispatch(requestRobotsSuccess(data)))
    .catch(err => dispatch(requestRobotsFail(err)));
};
export const requestRobotStart = () => ({ type: REQUEST_ROBOT_START });

export const requestRobotSuccess = data => ({
  type: REQUEST_ROBOT_SUCCESS,
  payload: data,
});

export const requestRobotFail = err => ({
  type: REQUEST_ROBOT_FAIL,
  payload: err,
});

export const requestRobot = id => (dispatch) => {
  dispatch(requestRobotsStart());

  robotApiCall(`/${id}`, {
    method: 'GET',
    headers: {
      'Content-Type': 'application/json',
      'x-access-token': localStorage.getItem('currentUser'),
    },
  })
    .then(data => dispatch(requestRobotSuccess(data)))
    .catch(err => dispatch(requestRobotFail(err)));
};

export const requestMakeUnavailableStart = () => ({ type: REQUEST_UPDATE_ROBOT_START });

export const requestMakeUnavailableSuccess = data => ({
  type: REQUEST_UPDATE_ROBOT_SUCCESS,
  payload: data,
});

export const requestMakeUnavailableFail = err => ({
  type: REQUEST_UPDATE_ROBOT_FAIL,
  payload: err,
});

export const requestMakeUnavailable = id => (dispatch) => {
  dispatch(requestMakeUnavailableStart());


  robotApiCall(`/${id}`, {
    method: 'PUT',
    headers: {
      'Content-Type': 'application/json',
      'x-access-token': localStorage.getItem('currentUser'),
    },
    body: JSON.stringify({ isAvailable: false }),
  })
    .then(res => dispatch(requestMakeUnavailableSuccess(res)))
    .catch(err => dispatch(requestMakeUnavailableSuccess(err)));
};

export const requestMakeAvailableStart = () => ({ type: REQUEST_UPDATE_ROBOT_START });

export const requestMakeAvailableSuccess = data => ({
  type: REQUEST_UPDATE_ROBOT_SUCCESS,
  payload: data,
});

export const requestMakeAvailableFail = err => ({
  type: REQUEST_UPDATE_ROBOT_FAIL,
  payload: err,
});

export const requestMakeAvailable = id => (dispatch) => {
  dispatch(requestMakeAvailableStart());

  robotApiCall(`/${id}/endsession`, {
    method: 'PUT',
    headers: {
      'Content-Type': 'application/json',
      'x-access-token': localStorage.getItem('currentUser'),
    },
    body: JSON.stringify({ isAvailable: true, streamUrl: '' }),
  })
    .then(res => dispatch(requestMakeAvailableSuccess(res)))
    .catch(err => dispatch(requestMakeAvailableSuccess(err)));
};

export const requestClearRobot = () => ({
  type: REQUEST_CLEAR_ROBOT,

});

export const requestClear = () => (dispatch) => {
  dispatch(requestClearRobot());
};
