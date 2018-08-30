import { combineReducers } from 'redux';

import auth from './auth/authReducer';
import user from './user/userReducer';
import notifications from './notifications/notificationsReducer';

const nodeBotApp = combineReducers({
  auth,
  user,
  notifications,
});

export default nodeBotApp;
