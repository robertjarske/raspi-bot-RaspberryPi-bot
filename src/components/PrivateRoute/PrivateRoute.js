import React from 'react';
import { connect } from 'react-redux';
import { Route, Redirect } from 'react-router-dom';

const PrivateRoute = ({
  component: Component,
  authenticated,
  ...rest
}) => (
    <Route
      {...rest}
      render={props => (authenticated === true ? (
          <Component {...props} />
      ) : (
          <Redirect
            to={{ pathname: '/login', state: { from: props.location } }}
          />
      ))
      }
    />
);

const mapStateToProps = state => ({
  authenticated: state.auth.isAuthenticated,
});

export default connect(mapStateToProps)(PrivateRoute);
