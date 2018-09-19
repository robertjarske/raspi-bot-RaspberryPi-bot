import React from 'react';
import { Button } from '../../elements';
import './NotFound.css';

const NotFound = ({ ...props }) => (
  <div className="notfound">
    <div className="notfound-icon"></div>
    <h3 className="notfound-text">Oops, something went south, there are no robots here...</h3>
    <Button appearance="success" onClick={() => props.history.goBack()}>Go Back</Button>
  </div>
);

export default NotFound;
