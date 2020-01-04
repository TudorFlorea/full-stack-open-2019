import React from 'react'

const Message = ({ notification }) => {
  const {content, success} = notification;
  const classes = success ? 'notification' : 'error'
  return <p className={classes}>{content}</p>
}

export default Message
