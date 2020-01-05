import React from 'react'
import { useField } from '../hooks'
import { Form, Button } from 'react-bootstrap'
import { Link } from 'react-router-dom'

const LoginForm = ({ onSubmit }) => {

  const username = useField('text')
  const password = useField('password')

  const handleSubmit = e => {
    e.preventDefault()
    onSubmit({
      username: username.value,
      password: password.value
    })
  }

  return (
    <Form onSubmit={handleSubmit}>
      <Form.Group controlId="username">
        <Form.Label>Username</Form.Label>
        <Form.Control data-cy="login-username" {...username} reset="" placeholder="Enter username" />
      </Form.Group>
      <Form.Group controlId="password">
        <Form.Label>Password</Form.Label>
        <Form.Control data-cy="login-password" {...password} reset="" placeholder="Enter password" />
      </Form.Group>
      <Button data-cy="login-submit" variant="primary" type="submit">
          Login
      </Button>
      <Form.Group>
        <Form.Text className="text-muted">
            or <Link to="/signup">Signup</Link>
        </Form.Text>
      </Form.Group>
    </Form>
  )
}

export default LoginForm
