import React from 'react';
import { Switch, Route } from 'react-router-dom';
import { connect } from 'react-redux';
import {
  PrivateRoute, withPublicRoot, Notifications,
} from './components';
import {
  Dashboard, Developer, Landingpage, Login, Signup, NotFound,
} from './views';
import isMobile from './utils/isMobile';
import { removeOldNotification } from './redux/notifications/actions';
import { requestLogin, requestLogout, requestCurrentUser } from './redux/auth/actions';
import { requestRobots } from './redux/robots/actions';
import verifyAuth from './utils/verifyAuth';
import './App.css';


const mapStateToProps = state => ({
  isAuthenticated: state.auth.isAuthenticated,
  user: state.user.user,
  notifications: state.notifications.messages,
});

const mapDispatchToProps = dispatch => ({
  removeOldNotification: notification => dispatch(removeOldNotification(notification)),
  requestLogin: credentials => dispatch(requestLogin(credentials)),
  requestLogout: () => dispatch(requestLogout()),
  requestCurrentUser: token => dispatch(requestCurrentUser(token)),
  requestRobots: () => dispatch(requestRobots()),
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

    this.changeMenu = this.changeMenu.bind(this);
    this.removeNotifications = this.removeNotifications.bind(this);
    this.logout = this.logout.bind(this);
  }

  componentDidMount() {
    if (verifyAuth.isLoggedIn()) {
      this.props.requestCurrentUser(localStorage.getItem('currentUser'));
    }
    this.props.requestRobots();

    if (isMobile.any()) {
      this.setState({
        mobileDevice: true,
      });
    } else {
      this.setState({
        mobileDevice: false,
      });
    }
  }

  logout() {
    this.props.requestLogout();
  }

  changeMenu() {
    this.setState({
      activeMenu: !this.state.activeMenu,
    });
  }

  removeNotifications(id) {
    this.props.removeOldNotification(id);
  }


  render() {
    const { backend, activeMenu } = this.state;
    const { isAuthenticated } = this.props;

    return (
      <div className="App">
      <Notifications
        notifications={this.props.notifications}
        removeNotifications={this.removeNotifications}
      />
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
                  logout={this.logout}
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
                  logout={this.logout}
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
                  logout={this.logout}
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
                  logout={this.logout}
                />
              )}
            />
            <Route path="*" component={NotFound} />
          </Switch>
      </div>
    );
  }
}

export default connect(
  mapStateToProps,
  mapDispatchToProps,
)(App);
