import React from 'react';
import { Form } from '../../components';
import './Login.css';

const Login = ({ ...props }) => (
  <div className="content">

    <Form kindof={'login'}/>
    <div className="background"></div>
  </div>
);

export default Login;
