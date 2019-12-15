import React from 'react'
import {connect} from 'react-redux';

const Notification = (props) => {
  const style = {
    border: 'solid',
    padding: 10,
    borderWidth: 1
  }

  const message = props.message;

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

export default connect(
  mapStateToProps
)(Notification)