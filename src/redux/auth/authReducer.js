import {
  REQUEST_AUTH_START,
  REQUEST_AUTH_SUCCESS,
  REQUEST_AUTH_FAIL,
  REQUEST_LOGOUT_START,
  REQUEST_LOGOUT_SUCCESS,
  REQUEST_LOGOUT_FAIL,
} from './constants';

import verifyAuth from '../../utils/verifyAuth';

const initialState = {
  isAuthenticated: verifyAuth.isLoggedIn(),
  isFetching: false,
};

const authReducer = (state = initialState, action) => {
  switch (action.type) {
    case REQUEST_AUTH_START:
      return { ...state, isFetching: true };
    case REQUEST_AUTH_SUCCESS:
      return {
        ...state,
        isAuthenticated: verifyAuth.isLoggedIn(),
        isFetching: false,
      };
    case REQUEST_AUTH_FAIL:
      return {
        ...state,
        isAuthenticated: false,
        isFetching: false,
      };
    case REQUEST_LOGOUT_START:
      return { ...state, isFetching: true };
    case REQUEST_LOGOUT_SUCCESS:
      return {
        ...state,
        isAuthenticated: false,
        isFetching: false,
      };
    case REQUEST_LOGOUT_FAIL:
      return {
        ...state,
        isFetching: false,
        isAuthenticated: verifyAuth.isLoggedIn(),
      };

    default:
      return state;
  }
};

export default authReducer;
