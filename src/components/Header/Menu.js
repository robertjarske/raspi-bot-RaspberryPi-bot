import React from 'react';
import { Link } from 'react-router-dom';
import './Menu.css';

const Menu = ({ ...props }) => (
  <div className={props.activeMenu ? 'change menu_container' : 'menu_container'} onClick={() => props.changeMenu()}>
    <div className="bar1"></div>
    <div className="bar2"></div>
    <div className="bar3"></div>
    {props.activeMenu && !props.isAuthenticated
      ? <nav className="dropdown">
          <ul className="dropdown-ul">
            <li className="dropdown-li"><Link to="/">HOME</Link></li>
            <li className="dropdown-li"><Link to="/login">LOGIN</Link></li>
            <li className="dropdown-li"><Link to="/signup">SIGNUP</Link></li>
          </ul>
        </nav>
      : props.activeMenu && props.isAuthenticated
        ? <nav className="dropdown">
            <ul className="dropdown-ul">
              <li className="dropdown-li"><Link to="/">HOME</Link></li>
              <li className="dropdown-li"><Link to="/dashboard">DASHBOARD</Link></li>
              <li className="dropdown-li"><p onClick={() => props.logout()}>LOGOUT</p></li>
            </ul>
          </nav>
        : ''}
  </div>
);

export default Menu;
