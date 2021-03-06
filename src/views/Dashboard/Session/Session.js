import React from 'react';
import io from 'socket.io-client';
import { connect } from 'react-redux';
import { requestAlive, requestMakeAvailable, requestRobot } from '../../../redux/robots/actions';
import { Loader, Stream } from '../../../components';
import './Session.css';

const mapStateToProps = state => ({
  robots: state.robots,
  isFetching: state.notifications.isFetching,
});

const mapDispatchToProps = dispatch => ({
  requestAlive: robot => dispatch(requestAlive(robot)),
  requestMakeAvailable: id => dispatch(requestMakeAvailable(id)),
  requestRobot: id => dispatch(requestRobot(id)),
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
    this.handleKeyPress = this.handleKeyPress.bind(this);

    this.socket.on('connect', () => {
      this.socket.emit('room', this.room);
    });
  }

  sendCommand(direction) {
    this.socket.emit('command', direction);
  }

  handleKeyPress = (event) => {
    if (event.type === 'keyup') return this.sendCommand('stop');
    switch (event.key) {
      case 'ArrowUp':
        this.sendCommand('forward');
        break;
      case 'ArrowDown':
        this.sendCommand('backward');
        break;
      case 'ArrowLeft':
        this.sendCommand('left');
        break;
      case 'ArrowRight':
        this.sendCommand('right');
        break;
      default:
        this.sendCommand('stop');
    }
    return event;
  }

  componentWillUnmount() {
    window.removeEventListener('keydown', this.handleKeyPress);
    window.removeEventListener('keyup', this.handleKeyPress);
    this.props.requestMakeAvailable(this.state.robotId);
    this.socket.emit('stop-stream');
  }

  componentDidMount() {
    window.addEventListener('keydown', this.handleKeyPress);
    window.addEventListener('keyup', this.handleKeyPress);
    this.socket.emit('start-stream', this.room);
    this.props.requestRobot(this.state.robotId);
  }

  render() {
    const { robot } = this.props.robots;
    if (!robot) return <Loader />;
    return (
      <div className="session">
          <Stream robot={robot} robotId={robot._id} socket={this.socket}/>
          <div className="session-button-container">
            <div className="gamepad-holder">
              <div
                className="up"
                onTouchStart={() => this.sendCommand('forward')}
                onTouchEnd={() => this.sendCommand('stop')}
                onMouseDown={() => this.sendCommand('forward')}
                onMouseUp={() => this.sendCommand('stop')}
                ><i className="arrow arrow-up"></i></div>
              <div
                className="down"
                onTouchStart={() => this.sendCommand('backward')}
                onTouchEnd={() => this.sendCommand('stop')}
                onMouseDown={() => this.sendCommand('backward')}
                onMouseUp={() => this.sendCommand('stop')}
                ><i className="arrow arrow-down"></i></div>
              <div
                className="left"
                onTouchStart={() => this.sendCommand('left')}
                onTouchEnd={() => this.sendCommand('stop')}
                onMouseDown={() => this.sendCommand('left')}
                onMouseUp={() => this.sendCommand('stop')}
                ><i className="arrow arrow-left"></i></div>
              <div
                className="right"
                onTouchStart={() => this.sendCommand('right')}
                onTouchEnd={() => this.sendCommand('stop')}
                onMouseDown={() => this.sendCommand('right')}
                onMouseUp={() => this.sendCommand('stop')}
                ><i className="arrow arrow-right"></i></div>
              <div className="gamepad"></div>
            </div>
          </div>
      </div>
    );
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(Session);
