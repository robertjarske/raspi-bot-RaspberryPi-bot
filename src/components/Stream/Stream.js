import React from 'react';
import { connect } from 'react-redux';
import { Player } from 'broadway-player';
import { Loader } from '..';

import { requestRobot } from '../../redux/robots/actions';
import './Stream.css';

const mapDispatchToProps = dispatch => ({
  requestRobot: id => dispatch(requestRobot(id)),
});

class Stream extends React.Component {
  constructor(props) {
    super(props);

    this.VideoPlayer = new Player({
      useWorker: true,
      webgl: 'true',
      workerFile: '../../Decoder.js',

    });
  }

  componentDidUpdate(prevProps) {
    if (!prevProps.robot.streamUrl) {
      this.props.requestRobot(this.props.robot._id);
    }
  }

  render() {
    const { streamUrl } = this.props.robot;
    if (!streamUrl) return <Loader text="Waiting for video feed..." />;

    return (
      <iframe title="video-stream" className="stream-canvas" src={streamUrl} frameBorder="0" scrolling="no" width={window.innerWidth} height={window.innerHeight}></iframe>
    );
  }
}

export default connect(null, mapDispatchToProps)(Stream);
