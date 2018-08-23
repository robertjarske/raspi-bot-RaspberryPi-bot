import { combineReducers } from 'redux';

import auth from './auth/authReducer';
import user from './user/userReducer';

const nodeBotApp = combineReducers({
  auth,
  user,
});

export default nodeBotApp;
