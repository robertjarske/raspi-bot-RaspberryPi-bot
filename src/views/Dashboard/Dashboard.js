import React from 'react';
import { NavLink, Route, Switch } from 'react-router-dom';
import { connect } from 'react-redux';
import { Logo } from '../../components';
import Profile from './Profile/Profile';
import ActiveSessions from './ActiveSessions/ActiveSessions';
import Admin from './Admin/Admin';
import Developer from './Developer/Developer';
import Robots from './Robots/Robots';
import { requestLogout } from '../../redux/auth/actions';
import './Dashboard.css';

const mapStateToProps = state => ({
  isAuthenticated: state.auth.isAuthenticated,
  user: state.auth.user,
});

const mapDispatchToProps = dispatch => ({
  requestLogout: () => dispatch(requestLogout()),
});

const Dashboard = ({ ...props }) => (
    <div className="dashboard">
      <aside className="side-nav">
        <Logo />
        <div className="side-nav-divider"></div>
        <ul className="side-nav-list">
          <div>
            <NavLink activeClassName="active-navlink" exact to={`${props.match.url}`}>
              <li className="side-nav-listitem">
                Profile
              </li>
            </NavLink>
            <NavLink activeClassName="active-navlink" exact to={`${props.match.url}/robots`}>
              <li className="side-nav-listitem">
                Robots
              </li>
            </NavLink>
            <NavLink activeClassName="active-navlink" exact to={`${props.match.url}/activesessions`}>
              <li className="side-nav-listitem">
                Active Sessions
              </li>
            </NavLink>
          </div>
          <div>
            {props.user.admin
              ? <NavLink activeClassName="active-navlink" exact to={`${props.match.url}/admin`}>
                  <li className="side-nav-listitem">
                    Admin
                  </li>
                </NavLink>
              : ''}
            <NavLink activeClassName="active-navlink" exact to={`${props.match.url}/developer`}>
              <li className="side-nav-listitem">
                Developer
              </li>
            </NavLink>
              <li className="side-nav-listitem" onClick={() => props.requestLogout()}>
                Logout
              </li>

          </div>
        </ul>
        </aside>
        <Switch>
          <Route
            exact
            path={`${props.match.url}`}
            render={() => <Profile user={props.user} />}
          />
          <Route
            exact
            path={`${props.match.url}/robots`}
            render={() => <Robots user={props.user} />}
          />
          <Route
            exact
            path={`${props.match.url}/activesessions`}
            render={() => <ActiveSessions user={props.user} />}
          />
          <Route
            exact
            path={`${props.match.url}/admin`}
            render={() => <Admin user={props.user} />}
          />
          <Route
            exact
            path={`${props.match.url}/developer`}
            render={() => <Developer user={props.user} />}
          />
        </Switch>
      </div>
);

export default connect(
  mapStateToProps,
  mapDispatchToProps,
)(Dashboard);
