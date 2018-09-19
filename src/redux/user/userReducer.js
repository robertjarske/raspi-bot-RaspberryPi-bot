import {
  REQUEST_AUTH_SUCCESS,
  REQUEST_AUTH_FAIL,
  REQUEST_LOGOUT_SUCCESS,
  REQUEST_LOGOUT_FAIL,
} from '../auth/constants';

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

const initialState = {
  user: {},
  users: [],
  isFetching: false,
};

const userReducer = (state = initialState, action) => {
  switch (action.type) {
    case REQUEST_AUTH_SUCCESS:
      return {
        ...state,
        user: action.payload.user,
      };
    case REQUEST_AUTH_FAIL:
      return {
        ...state,
        user: {},
      };
    case REQUEST_LOGOUT_SUCCESS:
      return {
        ...state,
        user: {},
      };
    case REQUEST_LOGOUT_FAIL:
      return {
        state,
      };
    case REQUEST_UPDATE_USER_START:
      return { ...state, isFetching: true };

    case REQUEST_UPDATE_USER_SUCCESS:
      return {
        ...state,
        isFetching: false,
        user: action.payload.user,
      };

    case REQUEST_UPDATE_USER_FAIL:
      return {
        ...state,
        isFetching: false,
      };

    case REQUEST_ADMIN_UPDATE_USER_START:
      return { ...state, isFetching: true };

    case REQUEST_ADMIN_UPDATE_USER_SUCCESS:
      return {
        ...state,
        isFetching: false,
        users: state.users.map((user) => {
          if (user._id === action.payload.user._id) {
            const updatedUser = action.payload.user;
            return updatedUser;
          }
          return user;
        }),
      };

    case REQUEST_ADMIN_UPDATE_USER_FAIL:
      return {
        ...state,
        isFetching: false,
      };

    case REQUEST_USERS_START:
      return { ...state, isFetching: true };
    case REQUEST_USERS_SUCCESS:
      return {
        ...state,
        isFetching: false,
        users: action.payload.users,
      };
    case REQUEST_USERS_FAIL:
      return {
        ...state,
        isFetching: false,
      };
    case REQUEST_USER_CREATE_START:
      return { ...state, isFetching: true };
    case REQUEST_USER_CREATE_SUCCESS:
      return {
        ...state,
        isFetching: false,
        users: [...state.users, action.payload.user],
      };
    case REQUEST_USER_CREATE_FAIL:
      return {
        ...state,
        isFetching: false,
      };
    case REQUEST_USER_DELETE_START:
      return { ...state, isFetching: true };
    case REQUEST_USER_DELETE_SUCCESS:
      return {
        ...state,
        isFetching: false,
        users: state.users.filter(user => user._id !== action.payload.user._id),
      };
    case REQUEST_USER_DELETE_FAIL:
      return {
        ...state,
        isFetching: false,
      };
    case REQUEST_SEARCH_START:
      return { ...state, isFetching: true };
    case REQUEST_SEARCH_SUCCESS:
      return {
        ...state,
        isFetching: false,
        users: action.payload.users,
      };
    case REQUEST_SEARCH_FAIL:
      return {
        ...state,
        isFetching: false,
      };

    default:
      return state;
  }
};

export default userReducer;
