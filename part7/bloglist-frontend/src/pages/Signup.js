import React from 'react'
import { connect } from 'react-redux'
import { Redirect } from 'react-router-dom'

import SignupForm from '../components/SignupForm'
import Heading from '../components/Heading'
import UsersService from '../services/users';

const Signup = props => {

  const handleSignupSubmit = async credentials => {
    try {
      await UsersService.signup(credentials)
      props.history.push('/login')
    } catch(err) {
      console.log(err)
    }
    
  }

  if(props.auth.user) return <Redirect to="/" />

  return (
    <>
      <Heading text="Signup" />
      <SignupForm onSubmit={handleSignupSubmit} />
    </>

  )
}

const mapStateToProps = state => {
  return {
    auth: state.auth
  }
}

export default connect(
  mapStateToProps
)(Signup)