import React from 'react'
import { Field, reduxForm, SubmissionError } from 'redux-form'
import { Link } from 'react-router';

import { TextInputField } from "./FormField.jsx";

const validate = ({ userName, password }) => {
  const errors = {};
  if (!userName) errors.userName = 'Username is required'
  if (!password) errors.password = 'Password is required'
  return errors
}

const loginForm = props => {
  const { handleSubmit, pristine, reset, submitting, invalid, error } = props
  return (
    <form onSubmit={handleSubmit}>
      {error && <h2 className="error">{error}</h2>}
      <h2><img src="public/login.png" width="50px" alt=""/>Login</h2>
      <div>
        <Field name="userName" component={TextInputField} label="Username"/>
      </div>
      <div>
        <Field name="password" component={TextInputField} type="password" label="Password"/>
      </div>
      <div className="button-group">
        <button type="submit" className="btn btn-primary" disabled={pristine || invalid || submitting}>{submitting ? "Submiting.." : "Submit"}</button>
      </div>
    </form>
  )
}

export default reduxForm({
  form: 'loginForm', // a unique identifier for this form
  validate
})(loginForm)
