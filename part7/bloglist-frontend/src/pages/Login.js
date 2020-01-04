import React from 'react'
import { connect } from 'react-redux'
import { Redirect } from 'react-router-dom'

import LoginForm from '../components/LoginForm'
import Heading from '../components/Heading'
import { login } from '../store/actions/authActions'

const Login = props => {

  const handleLogInSubmit = credentials => {
    props.login(credentials)
  }

  if(props.auth.user) return <Redirect to="/" />

  return (
    <>
      <Heading text="Login" />
      <LoginForm onSubmit={handleLogInSubmit} />
    </>

  )
}

const mapStateToProps = state => {
  return {
    auth: state.auth
  }
}

const mapDispatchToProps = dispatch => {
  return {
    login: credentials => dispatch(login(credentials))
  }
}

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(Login)