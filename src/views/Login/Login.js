import React from 'react';
import { connect } from 'react-redux';
import { Form } from '../../components';
import { requestLogin } from '../../redux/auth/actions';
import './Login.css';

const mapStateToProps = state => ({
  isAuthenticated: state.auth.isAuthenticated,
  user: state.auth.user,
});

const mapDispatchToProps = dispatch => ({
  requestLogin: credentials => dispatch(requestLogin(credentials)),
});

const Login = ({ ...props }) => (
  <div className="content">

    <Form loginRequest={props.requestLogin} kindof={'login'}/>
    <div className="background"></div>
  </div>
);

export default connect(
  mapStateToProps,
  mapDispatchToProps,
)(Login);
