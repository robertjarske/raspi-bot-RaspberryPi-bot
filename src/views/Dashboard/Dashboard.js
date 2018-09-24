import React from 'react';
import { NavLink, Route, Switch } from 'react-router-dom';
import { connect } from 'react-redux';
import { Logo, Menu } from '../../components';
import Profile from './Profile/Profile';

import Admin from './Admin/Admin';
import Developer from '../Developer/Developer';
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
      width: window.innerWidth,
      activeMenu: false,
    };

    this.createSession = this.createSession.bind(this);
    this.changeMenu = this.changeMenu.bind(this);
    this.onResize = this.onResize.bind(this);
  }

  componentDidMount() {
    window.addEventListener('resize', this.onResize);
  }

  componentWillUnmount() {
    window.removeEventListener('resize', this.onResize);
  }

  onResize() {
    this.setState({ width: window.innerWidth });
  }

  createSession(robot) {
    this.setState({
      createSessionWithRobot: robot,
    });
  }

  changeMenu() {
    this.setState({
      activeMenu: !this.state.activeMenu,
    });
  }

  render() {
    const windowSmall = this.state.width <= 800;
    return (
    <div className="dashboard">
    {windowSmall
      ? <header className="dashboard-mobile-header">
          <Logo />
          <Menu
            requestLogout={this.props.requestLogout}
            admin={this.props.user.admin}
            activeMenu={this.state.activeMenu}
            dashboardMenu={true}
            changeMenu={this.changeMenu}/>
        </header>
      : <aside className="side-nav">
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
    }

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
