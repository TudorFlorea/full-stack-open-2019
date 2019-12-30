import React from 'react'

const Message = ({ text, isError = false }) => {
  const classes = isError ? 'error' : 'notification'
  return <p className={classes}>{text}</p>
}

export default Message
