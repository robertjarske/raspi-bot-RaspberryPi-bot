import { REMOVE_OLD_NOTIFICATION } from './constants';

export const removeOldNotification = notification => ({
  type: REMOVE_OLD_NOTIFICATION,
  payload: notification,
});
