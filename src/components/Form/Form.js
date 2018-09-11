import React from 'react';
import { withFormik } from 'formik';
import * as Yup from 'yup';
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
}) => {
  console.log(props);
  return (
    <form onSubmit={handleSubmit}>
      <input
        value={values.email}
        onChange={handleChange}
        onBlur={handleBlur}
        name="email"
        type="email"
        placeholder="Email..."
      />
      <input
        value={values.password}
        onChange={handleChange}
        onBlur={handleBlur}
        name="password"
        type="password"
        placeholder="Password..."
        />
      <button type="submit">Login</button>
    </form>
  );
};

export default withFormik({
  mapPropsToValues() {
    return {
      email: '',
      password: '',
    };
  },
  validationSchema: Yup.object().shape({
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
    // Send a request to db and check if the email and password is correct
    props.loginRequest(values);
  },
})(Form);
