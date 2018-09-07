import React from 'react';
import io from 'socket.io-client';
import { connect } from 'react-redux';
import Header from './components/Header/Header';
import Stream from './components/Stream/Stream';
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
      mobileDevice: false,
      activeMenu: false,
    };

    this.sendCommand = this.sendCommand.bind(this);
    this.changeMenu = this.changeMenu.bind(this);
    this.socket = io(`${process.env.REACT_APP_API_URL}/123`);
  }

  componentDidMount() {
    if (isMobile.any()) {
      this.setState({
        mobileDevice: true,
      });
    } else {
      this.setState({
        mobileDevice: false,
      });
    }

    apiCall(process.env.REACT_APP_API_URL)
      .then((res) => {
        this.setState({
          backend: res.res,
        });
      })
      .catch(e => console.error(e));
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
    const { backend, mobileDevice, activeMenu } = this.state;

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
        <Stream />
        {mobileDevice ? <p>Mobile Device detected</p> : <p>Not mobile device</p>}
      </div>
    );
  }
}

export default connect(
  mapStateToProps,
  mapDispatchToProps,
)(App);
