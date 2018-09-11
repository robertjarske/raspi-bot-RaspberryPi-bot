import React from 'react';
import { Switch, Route } from 'react-router-dom';
import io from 'socket.io-client';
import { connect } from 'react-redux';
import {
  PrivateRoute, Stream, withPublicRoot,
} from './components';
import {
  Dashboard, Developer, Landingpage, Login, Signup, NotFound,
} from './views';
import isMobile from './utils/isMobile';
import { curriedApiCall } from './utils/apiCall';
import { requestAuth } from './redux/auth/actions';
import './App.css';


const mapStateToProps = state => ({
  isAuthenticated: state.auth.isAuthenticated,
  user: state.auth.user,
});

const mapDispatchToProps = dispatch => ({
  requestAuth: credentials => dispatch(requestAuth(credentials)),
});

const LandingpageWithPublic = withPublicRoot(Landingpage);
const LoginWithPublic = withPublicRoot(Login);
const SignupWithPublic = withPublicRoot(Signup);
const DeveloperpageWithPublic = withPublicRoot(Developer);


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

    curriedApiCall(process.env.REACT_APP_API_URL)(null, {
      headers: {
        'Content-Type': 'application/json',
      },
    })
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
    this.props.requestAuth({ email: 'rob@test.com', password: 'password' });
  }

  changeMenu() {
    this.setState({
      activeMenu: !this.state.activeMenu,
    });
  }

  render() {
    const { backend, mobileDevice, activeMenu } = this.state;
    const { isAuthenticated, user } = this.props;
    console.log(isAuthenticated, user);

    return (
      <div className="App">
      <Switch>
            <Route
              exact
              path="/"
              render={routeProps => (
                <LandingpageWithPublic
                  {...routeProps}
                  authenticated={isAuthenticated}
                  backend={backend}
                  activeMenu={activeMenu}
                  changeMenu={this.changeMenu}
                />
              )}
            />
            <Route
              exact
              path="/login"
              render={routeProps => (
                <LoginWithPublic
                  {...routeProps}
                  authenticated={isAuthenticated}
                  backend={backend}
                  activeMenu={activeMenu}
                  changeMenu={this.changeMenu}
                />
              )}
            />
            <Route
              exact
              path="/signup"
              render={routeProps => (
                <SignupWithPublic
                  {...routeProps}
                  authenticated={isAuthenticated}
                  backend={backend}
                  activeMenu={activeMenu}
                  changeMenu={this.changeMenu}
                />
              )}
            />
            <PrivateRoute path="/dashboard" component={Dashboard} />
            <Route
              path="/developer"
              render={routeProps => (
                <DeveloperpageWithPublic
                  {...routeProps}
                  authenticated={isAuthenticated}
                  backend={backend}
                  activeMenu={activeMenu}
                  changeMenu={this.changeMenu}
                />
              )}
            />
            <Route path="*" component={NotFound} />
          </Switch>
        {/* <button
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
        </button> */}
        <Stream socket={this.socket}/>
        {mobileDevice ? <p>Mobile Device detected</p> : <p>Not mobile device</p>}
      </div>
    );
  }
}

export default connect(
  mapStateToProps,
  mapDispatchToProps,
)(App);
