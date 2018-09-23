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
} from './constants';

const initialState = {
  isFetching: false,
  robots: [],
  robot: [],
};

const robotsReducer = (state = initialState, action) => {
  switch (action.type) {
    case REQUEST_ALIVE_START:
      return { ...state, isFetching: true };
    case REQUEST_ALIVE_SUCCESS:
      return {
        ...state,
        isOnline: true,
        isFetching: false,
      };
    case REQUEST_ALIVE_FAIL:
      return {
        ...state,
        robots: state.robots.map((robot) => {
          if (robot._id === action.payload.robot._id) {
            const offlineRobot = action.payload.robot;
            offlineRobot.isOnline = false;
            offlineRobot.isAvailable = false;
            return offlineRobot;
          }
          return robot;
        }),
        isFetching: false,
      };
    case REQUEST_ROBOTS_START:
      return { ...state, isFetching: true };
    case REQUEST_ROBOTS_SUCCESS:
      return {
        ...state,
        robots: action.payload.robots,
        isFetching: false,
      };
    case REQUEST_ROBOTS_FAIL:
      return {
        ...state,
        isFetching: false,
      };
    case REQUEST_ROBOT_START:
      return { ...state, isFetching: true };
    case REQUEST_ROBOT_SUCCESS:
      return {
        ...state,
        robot: action.payload.robot,
        isFetching: false,
      };
    case REQUEST_ROBOT_FAIL:
      return {
        ...state,
        isFetching: false,
      };

    case REQUEST_UPDATE_ROBOT_START:
      return { ...state, isFetching: true };
    case REQUEST_UPDATE_ROBOT_SUCCESS:
      return {
        ...state,
        robot: action.payload.robot,
        isFetching: false,
      };
    case REQUEST_UPDATE_ROBOT_FAIL:
      return {
        ...state,
        isFetching: false,
      };

    default:
      return state;
  }
};

export default robotsReducer;
