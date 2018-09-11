import React from 'react';
import './Input.css';


const Input = ({ ...props }) => (
  <div className="input-holder">
    <input {...props}/>
  </div>
);

export default Input;
