import React from 'react';
import './Notification.css';

const Notification = ({
  appearance = 'default',
  handleClick,
  ...props
}) => (
  <div className={`notification ${appearance}`}
    {...props}
    onClick={handleClick}
  >
    {props.children}
    <span className='cross'>X</span>
  </div>
);

export default Notification;
