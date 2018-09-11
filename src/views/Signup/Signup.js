import React from 'react';
import { connect } from 'react-redux';
import { Form } from '../../components';
import { requestSignup } from '../../redux/auth/actions';

const mapStateToProps = state => ({
  isAuthenticated: state.auth.isAuthenticated,
  user: state.auth.user,
});

const mapDispatchToProps = dispatch => ({
  requestSignup: credentials => dispatch(requestSignup(credentials)),
});

const Signup = ({ ...props }) => (
  <div className="content">
    <Form signupRequest={props.requestSignup} kindof={'signup'}/>
    <div className="background"></div>
  </div>
);

export default connect(
  mapStateToProps,
  mapDispatchToProps,
)(Signup);
