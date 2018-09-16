import React from 'react';
import { Redirect } from 'react-router-dom';
import { connect } from 'react-redux';
import { Form } from '../../components';
import { requestLogin } from '../../redux/auth/actions';
import './Login.css';

const mapStateToProps = state => ({
  isAuthenticated: state.auth.isAuthenticated,
  user: state.user.user,
});

const mapDispatchToProps = dispatch => ({
  requestLogin: credentials => dispatch(requestLogin(credentials)),
});

const Login = ({ ...props }) => {
  if (props.isAuthenticated) {
    return <Redirect to="/dashboard" />;
  }

  return (
    <div className="content">

      <Form loginRequest={props.requestLogin} kindof={'login'}/>
      <div className="background"></div>
    </div>
  );
};
export default connect(
  mapStateToProps,
  mapDispatchToProps,
)(Login);
