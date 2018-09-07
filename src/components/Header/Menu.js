import React from 'react';
import './Menu.css';

const Menu = ({ ...props }) => (
  <div className={props.activeMenu ? 'change menu_container' : 'menu_container'} onClick={() => props.changeMenu()}>
    <div className="bar1"></div>
    <div className="bar2"></div>
    <div className="bar3"></div>
  </div>
);

export default Menu;
