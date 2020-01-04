import React from 'react'

const UserDetails = ({ user, onLogOut }) => {
  return (
    <p className="user-details">
      {user.name} logged in{' '}
      <button
        onClick={() => {
          onLogOut()
        }}
      >
        logout
      </button>
    </p>
  )
}

export default UserDetails
