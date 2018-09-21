import { combineReducers } from 'redux';

import auth from './auth/authReducer';
import user from './user/userReducer';
import notifications from './notifications/notificationsReducer';
import robots from './robots/robotsReducer';

const nodeBotApp = combineReducers({
  auth,
  user,
  notifications,
  robots,
});

export default nodeBotApp;
