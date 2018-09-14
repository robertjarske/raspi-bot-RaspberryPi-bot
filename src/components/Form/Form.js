import React from 'react';
import { withFormik } from 'formik';
import { Link } from 'react-router-dom';
import * as Yup from 'yup';
import { Button, Input } from '../../elements';
import './Form.css';

const Form = ({
  handleChange,
  handleSubmit,
  values,
  errors,
  touched,
  handleBlur,
  isSubmitting,
  loginRequest,
  ...props
}) => (
  props.kindof === 'login'
    ? <form className="form-container" onSubmit={handleSubmit}>
        <h2 className="form-heading">NodeBot ❤️️</h2>
        <h3>Login</h3>
        <Input
          value={values.email}
          onChange={handleChange}
          onBlur={handleBlur}
          name="email"
          type="email"
          placeholder="Email..."
        />
        <Input
          value={values.password}
          onChange={handleChange}
          onBlur={handleBlur}
          name="password"
          type="password"
          placeholder="Password..."
          />
        <Button appearance={'success'} type="submit">Login</Button>
        <p>No account? Go to <Link to="/signup" style={{ color: '#118ab2' }}>Signup</Link> to create one</p>
      </form>

    : <form className="form-container" onSubmit={handleSubmit}>
        <h2 className="form-heading">NodeBot ❤️️</h2>
        <h3>Create Account</h3>
        <Input
          value={values.name}
          onChange={handleChange}
          onBlur={handleBlur}
          name="name"
          type="name"
          placeholder="Name"
        />
        <Input
          value={values.username}
          onChange={handleChange}
          onBlur={handleBlur}
          name="username"
          type="username"
          placeholder="Username"
        />
        <Input
          value={values.email}
          onChange={handleChange}
          onBlur={handleBlur}
          name="email"
          type="email"
          placeholder="Email"
        />
        <Input
          value={values.password}
          onChange={handleChange}
          onBlur={handleBlur}
          name="password"
          type="password"
          placeholder="Password"
          />
        <Button type="submit">Create Account</Button>
        <p>Already have an account? Go to <Link to="/login" style={{ color: '#118ab2' }}>Login</Link> to get going</p>
      </form>

);

export default withFormik({
  mapPropsToValues(props) {
    if (props.kindof === 'signup') {
      return {
        email: '',
        password: '',
        name: '',
        username: '',
      };
    }
    return {
      email: '',
      password: '',
    };
  },
  validationSchema: Yup.object().shape({
    name: Yup.string()
      .min(1, 'Name must be longer than 1 character'),
    username: Yup.string()
      .min(1, 'Username must be longer than 1 character'),
    email: Yup.string()
      .email('Email is not valid')
      .required('Email is required'),
    password: Yup.string()
      .min(6, 'Password must be 6 characters or longer')
      .required('Password is required'),
  }),
  handleSubmit(values, {
    props,
  }) {
    if (props.kindof === 'signup') {
      return props.signupRequest(values);
    }

    return props.loginRequest(values);
  },
})(Form);
