import React from 'react'
import { Field, reduxForm, SubmissionError } from 'redux-form'
import axios from "axios";
import { connect } from 'react-redux'
import { browserHistory } from 'react-router';

import { login } from '../../redux/api.js'
import FormContainer from "./FormContainer.jsx";
import LoginForm from "../presentational/Login.jsx";


const loginContainer = props => {
  const { handleSubmit, pristine, reset, submitting, invalid, logUserIn } = props
  const submit = (values) => {
    return login(values)
      .then(res => {
        logUserIn(res)
        browserHistory.push('/tasks')
      })
      .catch(err => {
        throw new SubmissionError({ _error: 'Login failed!' })
      })
  }
  return (
    <FormContainer>
    	<LoginForm onSubmit={submit}/>
    </FormContainer>
  )
}


const mapDispatchToProps = dispatch => {
  return {
    logUserIn: (payload) => dispatch({ type: 'LOGIN', payload })
  }
}
export default connect(null, mapDispatchToProps)(loginContainer)
