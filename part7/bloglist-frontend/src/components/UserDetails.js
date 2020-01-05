import React from 'react'
import { Button } from 'react-bootstrap'

const UserDetails = ({ user, onLogOut }) => {
  return (
    <p data-cy="user-details" className="user-details">
      {user.name} logged in{' '}
      <Button
        variant="light"
        onClick={() => {
          onLogOut()
        }}
      >
        logout
      </Button>
    </p>
  )
}

export default UserDetails
