import React from 'react';
import io from 'socket.io-client';
import { Player } from 'broadway-player';

class Stream extends React.Component {
  constructor() {
    super();

    this.socket = io(`${process.env.REACT_APP_API_URL}/123`);
    this.VideoPlayer = new Player({
      useWorker: true,
      webgl: 'true',
      workerFile: './Decoder.js',
      width: 960,
      height: 540,
    });

    this.socket.on('stream', (stream) => {
      this.VideoPlayer.decode(new Uint8ClampedArray(stream));
      this.ctx.drawImage(this.VideoPlayer.canvas, 0, 0);
    });
  }

  componentDidMount() {
    this.ctx = this.canvasNode.getContext('2d');
    this.socket.emit('start-stream');
  }

  render() {
    return (
      <div style={{ width: '100%', display: 'flex', justifyContent: 'center' }}>
        <canvas
          ref={(node) => {
            this.canvasNode = node;
          }}
          width={960}
          height={540}
        />
      </div>
    );
  }
}

export default Stream;
