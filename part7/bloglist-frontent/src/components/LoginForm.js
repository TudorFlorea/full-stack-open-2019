import React, { useState } from 'react'
import {useField} from '../hooks';

const LoginForm = ({ onSubmit }) => {

  const username = useField('text');
  const password = useField('password');

  const handleSubmit = e => {
    e.preventDefault()
    onSubmit({
      username: username.value,
      password: password.value
    })
  }

  return (
    <form onSubmit={handleSubmit}>
      <label htmlFor="username">username</label>
      <input {...username} reset="" />
      <br />
      <label htmlFor="username">password</label>
      <input {...password} reset="" />
      <br />
      <button type="submit">login</button>
    </form>
  )
}

export default LoginForm
