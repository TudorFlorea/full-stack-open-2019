import React from 'react'
import { Alert } from 'react-bootstrap'

const Message = ({ notification }) => {
  const { content, success } = notification
  return (
    <Alert variant={success ? 'success' : 'danger'}>
      {content}
    </Alert>
  )
}

export default Message
