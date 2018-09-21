import React from 'react';
import { NavLink, Route, Switch } from 'react-router-dom';
import { connect } from 'react-redux';
import { Logo } from '../../components';
import Profile from './Profile/Profile';
import ActiveSessions from './ActiveSessions/ActiveSessions';
import Admin from './Admin/Admin';
import Developer from './Developer/Developer';
import Robots from './Robots/Robots';
import NotFound from '../NotFound/NotFound';
import Session from './Session/Session';
import WatchSession from './WatchSession/WatchSession';
import { requestLogout } from '../../redux/auth/actions';
import './Dashboard.css';

const mapStateToProps = state => ({
  isAuthenticated: state.auth.isAuthenticated,
  user: state.user.user,
});

const mapDispatchToProps = dispatch => ({
  requestLogout: () => dispatch(requestLogout()),
});

class Dashboard extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      createSessionWithRobot: {},
    };

    this.createSession = this.createSession.bind(this);
  }

  createSession(robot) {
    this.setState({
      createSessionWithRobot: robot,
    });
  }

  render() {
    return (
    <div className="dashboard">
      <aside className="side-nav">
        <Logo />
        <div className="side-nav-divider"></div>
        <ul className="side-nav-list">
          <div>
            <NavLink activeClassName="active-navlink" exact to={`${this.props.match.url}`}>
              <li className="side-nav-listitem">
                Profile
              </li>
            </NavLink>
            <NavLink activeClassName="active-navlink" exact to={`${this.props.match.url}/robots`}>
              <li className="side-nav-listitem">
                Robots
              </li>
            </NavLink>
            <NavLink activeClassName="active-navlink" exact to={`${this.props.match.url}/activesessions`}>
              <li className="side-nav-listitem">
                Active Sessions
              </li>
            </NavLink>
          </div>
          <div>
            {this.props.user.admin
              ? <NavLink activeClassName="active-navlink" exact to={`${this.props.match.url}/admin`}>
                  <li className="side-nav-listitem">
                    Admin
                  </li>
                </NavLink>
              : ''}
            <NavLink activeClassName="active-navlink" exact to={`${this.props.match.url}/developer`}>
              <li className="side-nav-listitem">
                Developer
              </li>
            </NavLink>
              <li className="side-nav-listitem" onClick={() => this.props.requestLogout()}>
                Logout
              </li>

          </div>
        </ul>
        </aside>
        <Switch>
          <Route
            exact
            path={`${this.props.match.url}`}
            render={() => <Profile user={this.props.user} />}
          />
          <Route
            exact
            path={`${this.props.match.url}/robots`}
            render={() => <Robots createSession={this.createSession} user={this.props.user} />}
          />
          <Route
            exact
            path={`${this.props.match.url}/activesessions`}
            render={() => <ActiveSessions user={this.props.user} />}
          />
          <Route
            exact
            path={`${this.props.match.url}/session/:robotId`}
            render={() => <Session {...this.props} user={this.props.user} />}
          />
          <Route
            exact
            path={`${this.props.match.url}/watchsession/:robotId`}
            render={() => <WatchSession {...this.props} user={this.props.user} />}
          />
          <Route
            exact
            path={`${this.props.match.url}/admin`}
            render={() => <Admin user={this.props.user} />}
          />
          <Route
            exact
            path={`${this.props.match.url}/developer`}
            render={() => <Developer user={this.props.user} />}
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
)(Dashboard);
