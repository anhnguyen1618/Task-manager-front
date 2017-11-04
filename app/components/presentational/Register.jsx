import React from 'react'
import { Field, reduxForm, SubmissionError } from 'redux-form'
import { Link } from 'react-router';


import { TextInputField, RadioGroup, RadioInput } from "./DumbComponents/FormField.jsx";

const validate = ({ userName, password }) => {
  const errors = {};
  if (!userName) errors.userName = 'Username is required'
  if (!password) errors.password = 'Password is required'
  return errors
}

const sleep = ms => new Promise(resolve => setTimeout(resolve, ms))

const asyncValidate = ({ userName }) => {
  return sleep(1000)
    .then(() => {
      if (['john', 'paul', 'george', 'ringo'].includes(userName)) {
        throw { userName: 'That username is taken' }
      }
    })
}

const registerForm = props => {
  const { handleSubmit, pristine, submitting, invalid } = props
  return (
    <form onSubmit={handleSubmit}>
			<h2><img src="static/login.png" width="50px" alt=""/>Register</h2>
      <div>
        <Field name="userName" component={TextInputField} label="Username"/>
      </div>
      <div>
        <Field name="password" component={TextInputField} type="password" label="Password"/>
      </div>
      <div>
        <Field name="position" component={RadioGroup}>
          <RadioInput value="manager" label="Manager"/>
          <RadioInput value="employee" label="Employee"/>
        </Field>
      </div>
      <div className="button-group">
      	<button type="submit" className="btn btn-primary" disabled={pristine || invalid || submitting}>{submitting ? "Submiting.." : "Submit"}</button>
 				< Link to="/" className="btn btn-success"> Back to login </Link>
 			</div>
    </form>
  )
}

export default reduxForm({
  form: 'registerForm', // a unique identifier for this form
  validate,
  initialValues: { position: "manager" },
  asyncValidate,
  asyncBlurFields: ['userName']
})(registerForm)
