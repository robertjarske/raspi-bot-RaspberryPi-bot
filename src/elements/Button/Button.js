import React from 'react';
import './Button.css';

const Button = ({ appearance, ...props }) => (
  <button className={appearance ? `btn ${appearance}` : 'btn'} {...props}>{props.children}</button>
);

export default Button;
