import React from 'react';
import './Menu.css';

const Menu = ({ ...props }) => (
  <div className={props.activeMenu ? 'change menu_container' : 'menu_container'} onClick={() => props.changeMenu()}>
    <div className="bar1"></div>
    <div className="bar2"></div>
    <div className="bar3"></div>
    {props.activeMenu
      ? <nav className="dropdown">
        <ul>
          <li><a href="#">Something</a></li>
          <li><a href="#">Something else</a></li>
          <li><a href="#">Something third</a></li>
        </ul>
      </nav> : ''}
  </div>
);

export default Menu;
