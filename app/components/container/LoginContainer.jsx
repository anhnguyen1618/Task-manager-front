import React from 'react'
import { Field, reduxForm, SubmissionError } from 'redux-form'
import axios from "axios";
import { connect } from 'react-redux'
import { withRouter } from 'react-router'

import { login } from '../../redux/api.js'
import FormContainer from "./FormContainer.jsx";
import LoginForm from "../presentational/Login.jsx";

const loginContainer = props => {
  const { handleSubmit, pristine, reset, submitting, invalid, logUserIn, router  } = props
  const submit = (values) => {
    return logUserIn(values)
      .then(res => {
        router.push('/tasks')
      })
      .catch(err => {
        console.log(err)
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
    logUserIn: (payload) => dispatch(login(payload))
  }
}
export default connect(null, mapDispatchToProps)(withRouter(loginContainer))
