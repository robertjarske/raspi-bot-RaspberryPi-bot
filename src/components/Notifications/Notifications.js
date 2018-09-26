import React from 'react';
import {
  CSSTransition,
  TransitionGroup,
} from 'react-transition-group';
import Notification from './Notification';
import './Notifications.css';

class Notifications extends React.Component {
  constructor({ position = 'bottomRight', props }) {
    super(props);

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
            <TransitionGroup>
              {notifications.map(notification => (
                notification.body && (
                    <CSSTransition
                    key={notification.id}
                    timeout={500}
                    enter={true}
                    exit={true}
                    classNames="notification"
                    >
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
                    </CSSTransition>
                )
              ))}
            </TransitionGroup>
          </div>


    );
  }
}

export default Notifications;
