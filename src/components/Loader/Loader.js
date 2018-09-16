import React from 'react';
import './Loader.css';

const Loader = () => (
  <div className="spinner">
    <div className="rect1"></div>
    <div className="rect2"></div>
    <div className="rect3"></div>
    <div className="rect4"></div>
    <div className="rect5"></div>
    <h4>Loading...</h4>
  </div>
);

export default Loader;
