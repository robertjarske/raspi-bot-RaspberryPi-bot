import React from 'react';
import logo from '../../assets/logo.svg';
import './Logo.css';

const Logo = ({ ...props }) => (
  <div className="logo_container">
    <img src={logo} className="logo" alt="logo" />
    <div className="logo_text">
      <h1 className="App-title">NodeBot Driver</h1>
      <p>
        Also connected to Pi:
        {props.backend}
      </p>
    </div>
  </div>
);

export default Logo;
