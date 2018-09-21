import React from 'react';
import io from 'socket.io-client';
import { connect } from 'react-redux';
import { requestAlive } from '../../../redux/robots/actions';
import { Loader, WatchStream } from '../../../components';
import './WatchSession.css';

const mapStateToProps = state => ({
  robots: state.robots,
  isFetching: state.notifications.isFetching,
});

const mapDispatchToProps = dispatch => ({
  requestAlive: robot => dispatch(requestAlive(robot)),
});

class WatchSession extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      robotId: this.props.location.pathname.slice(24),
    };
    this.socket = io(`${process.env.REACT_APP_API_URL}`);
    this.room = this.props.location.pathname.slice(24);

    this.socket.on('connect', () => {
      this.socket.emit('room', this.room);
    });
  }

  render() {
    console.log(this.room);
    const { robots } = this.props;
    if (!robots.robots[0]) return <Loader />;

    return (
      <div className="watch-session">
        <WatchStream socket={this.socket}/>
      </div>
    );
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(WatchSession);
