import React, { useState } from 'react'

const LoginForm = ({ onSubmit }) => {
  const [username, setUsername] = useState('')
  const [password, setPassword] = useState('')

  const handleUserNameChange = e => {
    setUsername(e.target.value)
  }

  const handlePasswordChange = e => {
    setPassword(e.target.value)
  }

  const handleSubmit = e => {
    e.preventDefault()
    onSubmit({
      username,
      password
    })
  }

  return (
    <form onSubmit={handleSubmit}>
      <label htmlFor="username">username</label>
      <input type="text" value={username} onChange={handleUserNameChange} />
      <br />
      <label htmlFor="username">password</label>
      <input type="password" value={password} onChange={handlePasswordChange} />
      <br />
      <button type="submit">login</button>
    </form>
  )
}

export default LoginForm
