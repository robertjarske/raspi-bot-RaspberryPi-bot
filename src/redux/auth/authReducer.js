import {
  REQUEST_AUTH_START,
  REQUEST_AUTH_SUCCESS,
  REQUEST_AUTH_FAIL,
  REQUEST_LOGOUT_START,
  REQUEST_LOGOUT_SUCCESS,
  REQUEST_LOGOUT_FAIL,
} from './constants';

const initialState = {
  isAuthenticated: false,
  user: {},
  isFetching: false,
};

const authReducer = (state = initialState, action) => {
  switch (action.type) {
    case REQUEST_AUTH_START:
      return { ...state, isFetching: true };
    case REQUEST_AUTH_SUCCESS:
      debugger;
      return {
        ...state,
        user: action.payload.user,
        isAuthenticated: true,
        isFetching: false,
      };
    case REQUEST_AUTH_FAIL:
      debugger;
      return {
        ...state,
        user: {},
        isAuthenticated: false,
        isFetching: false,
      };
    case REQUEST_LOGOUT_START:
      return { ...state, isFetching: true };
    case REQUEST_LOGOUT_SUCCESS:
      return {
        ...state,
        user: {},
        isAuthenticated: false,
        isFetching: false,
      };
    case REQUEST_LOGOUT_FAIL:
      return {
        ...state,
        isAuthenticated: true,
        isFetching: false,
      };

    default:
      return state;
  }
};

export default authReducer;
