import React from 'react';
import { connect } from 'react-redux';
import WSAvcPlayer from 'h264-live-player';
import { Loader } from '..';

import { requestRobot } from '../../redux/robots/actions';
import './Stream.css';

const mapDispatchToProps = dispatch => ({
  requestRobot: id => dispatch(requestRobot(id)),
});

class Stream extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      streamStarted: false,
    };
  }

  componentDidUpdate(prevProps) {
    if (!prevProps.robot.streamUrl) {
      return this.props.requestRobot(this.props.robot._id);
    }
    if (prevProps.robot.streamUrl && !this.state.streamStarted) {
      this.setState({
        streamStarted: true,
      });
      const canvas = document.querySelector('#player');
      const wsavc = new WSAvcPlayer(canvas, 'webgl');
      const protocol = window.location.protocol === 'https:' ? 'wss:' : 'ws:';
      wsavc.connect(`${protocol}//${this.props.robot.streamUrl}`);
    }
    return true;
  }

  render() {
    const { streamUrl } = this.props.robot;
    if (!streamUrl) return <Loader text="Waiting for video feed..." />;

    return (
      <canvas className="stream-canvas" id="player" />
    );
  }
}

export default connect(null, mapDispatchToProps)(Stream);
