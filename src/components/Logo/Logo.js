import React from 'react';
import { Link } from 'react-router-dom';
import logo from '../../assets/logo.svg';
import './Logo.css';

const Logo = () => (
  <div className="logo_container">
    <img src={logo} className="logo" alt="logo" />
    <div className="logo_text">
      <Link to={'/'} className="App-title">NodeBot <span className="logo-span">Driver</span></Link>
    </div>
  </div>
);

export default Logo;
