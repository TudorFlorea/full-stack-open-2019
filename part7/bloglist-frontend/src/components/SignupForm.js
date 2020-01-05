import React from 'react'
import { useField } from '../hooks'
import { Form, Button } from 'react-bootstrap'
import { Link } from 'react-router-dom'

const SignupForm = ({ onSubmit }) => {

  const username = useField('text')
  const name = useField('text')
  const password = useField('password')

  const handleSubmit = e => {
    e.preventDefault()
    onSubmit({
      username: username.value,
      password: password.value,
      name: name.value
    })
  }

  return (
    <Form onSubmit={handleSubmit}>
      <Form.Group controlId="name">
        <Form.Label>Name</Form.Label>
        <Form.Control data-cy="signup-name" {...name} reset="" placeholder="Enter name" />
      </Form.Group>
      <Form.Group controlId="username">
        <Form.Label>Username</Form.Label>
        <Form.Control data-cy="signup-username" {...username} reset="" placeholder="Enter username" />
      </Form.Group>
      <Form.Group controlId="password">
        <Form.Label>Password</Form.Label>
        <Form.Control data-cy="signup-password" {...password} reset="" placeholder="Enter password" />
      </Form.Group>
      <Button data-cy="signup-submit" variant="primary" type="submit">
          Signup
      </Button>
      <Form.Group>
        <Form.Text className="text-muted">
            or <Link to="/login">Login</Link>
        </Form.Text>
      </Form.Group>
    </Form>
  )
}

export default SignupForm
