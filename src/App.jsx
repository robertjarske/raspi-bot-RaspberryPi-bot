import React from 'react';
import io from 'socket.io-client';
import { connect } from 'react-redux';
import logo from './logo.svg';
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
    };

    this.sendCommand = this.sendCommand.bind(this);
    this.socket = io(process.env.REACT_APP_API_URL);
  }

  componentDidMount() {
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

  render() {
    const { backend } = this.state;

    return (
      <div className="App">
        <header className="App-header">
          <img src={logo} className="App-logo" alt="logo" />
          <h1 className="App-title">Welcome to React</h1>
          <p>
            Also connected to Pi:
            {backend}
          </p>
        </header>
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
        <button
          type="submit"
          onClick={() => this.login()}
        >
          Login
        </button>
        <div
          style={{ width: '100%', display: 'flex', justifyContent: 'center' }}
        >
          <div
            style={{
              height: '500px',
              width: '500px',
              backgroundImage: 'url(\'http://10.126.5.78:8080/?action=stream\')',
            }}
          />
        </div>
      </div>
    );
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(App);
