import React from 'react';
import io from 'socket.io-client';
import { connect } from 'react-redux';
import { Player } from 'broadway-player';
import Header from './components/Header/Header';
import isMobile from './utils/isMobile';
import { apiCall } from './utils/apiCall';
import { requestAuth } from './redux/auth/actions';
import './App.css';


const mapStateToProps = state => ({
  isAuthenticated: state.auth.isAuthenticated,
});

const mapDispatchToProps = dispatch => ({
  requestAuth: credentials => dispatch(requestAuth(credentials)),
});

class App extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      backend: '',
      isMobile: false,
      activeMenu: false,
    };

    this.sendCommand = this.sendCommand.bind(this);
    this.changeMenu = this.changeMenu.bind(this);
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
    this.socket.emit('start-stream');

    isMobile.any()
      ? this.setState({
        isMobile: true,
      })
      : this.setState({
        isMobile: false,
      });

    apiCall(process.env.REACT_APP_API_URL)
      .then((res) => {
        this.setState({
          backend: res.res,
        });
      })
      .catch(e => console.error(e));

    this.ctx = this.canvasNode.getContext('2d');
  }

  sendCommand(direction) {
    this.socket.emit('command', direction);
  }

  login() {
    this.props.requestAuth({ email: 'test@test.com', password: 'password' });
  }

  changeMenu() {
    this.setState({
      activeMenu: !this.state.activeMenu,
    });
  }

  render() {
    const { backend, isMobile, activeMenu } = this.state;

    return (
      <div className="App">
        <Header
          changeMenu={this.changeMenu}
          backend={backend}
          activeMenu={activeMenu}
        />
        <button
          type="submit"
          onMouseDown={() => this.sendCommand('forward')}
          onMouseUp={() => this.sendCommand('stop')}
        >
          Forward
        </button>
        <button
          type="submit"
          onMouseDown={() => this.sendCommand('backward')}
          onMouseUp={() => this.sendCommand('stop')}
        >
          Backward
        </button>
        <button
          type="submit"
          onMouseDown={() => this.sendCommand('left')}
          onMouseUp={() => this.sendCommand('stop')}
        >
          Left
        </button>
        <button
          type="submit"
          onMouseDown={() => this.sendCommand('right')}
          onMouseUp={() => this.sendCommand('stop')}
        >
          Right
        </button>
        <button type="submit" onClick={() => this.login()}>
          Login
        </button>
        <div
          style={{ width: '100%', display: 'flex', justifyContent: 'center' }}
        >
          <canvas
            ref={(node) => {
              this.canvasNode = node;
            }}
            width={960}
            height={540}
          />
        </div>
      </div>
    );
  }
}

export default connect(
  mapStateToProps,
  mapDispatchToProps,
)(App);
