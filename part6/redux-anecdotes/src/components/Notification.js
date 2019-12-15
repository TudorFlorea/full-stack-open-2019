import React from 'react'

import {clearNotification} from '../reducers/notificationReducer';

const Notification = ({store}) => {
  const style = {
    border: 'solid',
    padding: 10,
    borderWidth: 1
  }

  const message = store.getState().notifications.message;

  if(message) {
    setTimeout(() => {
      store.dispatch(clearNotification());
    }, 5000)
  }

  return (
    <>
      {message ? (
        <div style={style}>
        {store.getState().notifications.message}
      </div>
      ) : (null)}
    </>
  )
}

export default Notification