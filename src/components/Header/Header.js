import React from 'react';
import Logo from '../Logo/Logo';
import Menu from './Menu';
import './Header.css';

const Header = ({ ...props }) => (
  <header className="App-header">
    <Logo backend={props.backend}/>
    <Menu activeMenu={props.activeMenu} changeMenu={props.changeMenu}/>
  </header>
);

export default Header;
