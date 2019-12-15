import React from 'react'
import {connect} from 'react-redux';
import {clearNotification} from '../reducers/notificationReducer';

const Notification = (props) => {
  const style = {
    border: 'solid',
    padding: 10,
    borderWidth: 1
  }

  const message = props.message;

  if(message) {
    setTimeout(() => {
     props.clearNotification();
    }, 5000)
  }

  return (
    <>
      {message ? (
        <div style={style}>
        {message}
      </div>
      ) : (null)}
    </>
  )
}

const mapStateToProps = state => {
  return {
    message: state.notifications.message
  }
}

const mapDispatchToProps = dispatch => {
  return {
    clearNotification: () => { dispatch(clearNotification()) }
  }
}

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(Notification)