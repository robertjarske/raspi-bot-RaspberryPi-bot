import React from 'react';
import io from 'socket.io-client';
import { connect } from 'react-redux';
import { requestAlive, requestMakeAvailable } from '../../../redux/robots/actions';
import { Loader, Stream } from '../../../components';
import { Button } from '../../../elements';
import './Session.css';

const mapStateToProps = state => ({
  robots: state.robots,
  isFetching: state.notifications.isFetching,
});

const mapDispatchToProps = dispatch => ({
  requestAlive: robot => dispatch(requestAlive(robot)),
  requestMakeAvailable: id => dispatch(requestMakeAvailable(id)),
});

class Session extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      robotId: this.props.location.pathname.slice(19),
    };
    this.socket = io(`${process.env.REACT_APP_API_URL}`);
    this.room = this.props.location.pathname.slice(19);
    this.sendCommand = this.sendCommand.bind(this);

    this.socket.on('connect', () => {
      this.socket.emit('room', this.room);
    });
  }

  sendCommand(direction) {
    this.socket.emit('command', direction);
  }

  componentWillUnmount() {
    this.props.requestMakeAvailable(this.state.robotId);
  }

  render() {
    const { robots } = this.props;
    if (!robots.robots[0]) return <Loader />;

    return (
      <div className="session">
          <Stream robotId={this.state.robotId} socket={this.socket}/>
        <div className="session-button-container">
          <Button
            type="button"
            onMouseDown={() => this.sendCommand('forward')}
            onMouseUp={() => this.sendCommand('stop')}
          >
            Forward
          </Button>
          <Button
            type="button"
            onMouseDown={() => this.sendCommand('backward')}
            onMouseUp={() => this.sendCommand('stop')}
          >
            Backward
          </Button>
          <Button
            type="button"
            onMouseDown={() => this.sendCommand('left')}
            onMouseUp={() => this.sendCommand('stop')}
          >
            Left
          </Button>
          <Button
            type="button"
            onMouseDown={() => this.sendCommand('right')}
            onMouseUp={() => this.sendCommand('stop')}
          >
            Right
          </Button>
        </div>
      </div>
    );
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(Session);
