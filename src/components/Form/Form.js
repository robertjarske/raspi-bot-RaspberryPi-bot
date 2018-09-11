import React from 'react';
import { withFormik } from 'formik';
import * as Yup from 'yup';
import { Button, Input } from '../../elements';
import './Form.css';

const Form = ({
  handleChange, // Formiks handleChange
  handleSubmit, // Formiks handleSubmit that we use down below, can be used to show loading indicator and to check if email exists etc.
  values, // this is the "state" where all values are stored
  errors, // this is where all the errors are set, to call it use for example errors.email to get the email errors
  touched, // this gets set by handleBlur and is used to not show the error message until the user is finished writing and is moving on to another field
  handleBlur,
  isSubmitting,
  loginRequest,
  ...props
}) => (
  props.kindof === 'login'
    ? <form className="form-container" onSubmit={handleSubmit}>
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
      </form>

    : <form className="form-container" onSubmit={handleSubmit}>
        <h3>Create account</h3>
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
        <Button type="submit">Create account</Button>
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
    props, resetForm, setErrors, setSubmitting,
  }) {
    console.log(values);
    if (props.kindof === 'signup') {
      return props.signupRequest(values);
    }

    return props.loginRequest(values);
  },
})(Form);
