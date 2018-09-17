import React from 'react';
// import { CSSTransitionGroup } from 'react-transition-group';
import Notification from './Notification';
import './Notifications.css';

class Notifications extends React.Component {
  constructor({ position = 'bottomRight', ...props }) {
    super(...props);

    this.position = position;

    this.handleClick = this.handleClick.bind(this);
  }

  handleClick(id) {
    return this.props.removeNotifications(id);
  }

  render() {
    const notifications = Object.keys(this.props.notifications).map(
      key => this.props.notifications[key],
    );

    return (
          <div className={`notifications ${this.position}`}
          >
            {/* <CSSTransitionGroup
              transitionName="notification"
              transitionEnterTimeout={500}
              transitionLeaveTimeout={500}
            > */}
              {notifications.map(notification => (
                notification.body && (
                    <Notification
                      appearance={notification.type}
                      timer={setTimeout(() => {
                        this.props.removeNotifications(notification.id);
                      }, 5000)}
                      key={notification.id}
                      handleClick={e => this.handleClick(notification.id, e)}
                    >
                      {notification.body}
                    </Notification>
                )
              ))}
            {/* </CSSTransitionGroup> */}
          </div>


    );
  }
}

export default Notifications;
