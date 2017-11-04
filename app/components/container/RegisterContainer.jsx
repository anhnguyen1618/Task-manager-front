import React from 'react'
import { Field, reduxForm, SubmissionError } from 'redux-form'

import FormContainer from "./FormContainer.jsx";
import RegisterForm from "../presentational/Register.jsx";

const sleep = ms => new Promise(resolve => setTimeout(resolve, ms))

function submit({ userName, password, position }) {
  console.log({ userName, password, position });
  return sleep(1000) // simulate server latency
    .then(() => {
      if (!['john', 'tuyen', 'george', 'ringo'].includes(userName)) {
        throw new SubmissionError({ userName: 'User does not exist', _error: 'Login failed!' })
      } else if (password !== 'redux-form') {
        throw new SubmissionError({ password: 'Your password is wrong', _error: 'Login failed!' })
      } else {
        window.alert('Login in successful')
      }
    })
}

const RegisterContainer = props => {
  const { handleSubmit, pristine, reset, submitting, invalid } = props
  return (
    <FormContainer>
    	<RegisterForm onSubmit={submit}/>
    </FormContainer>
  )
}

export default RegisterContainer;
