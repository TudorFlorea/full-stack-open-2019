import React from 'react'
import { connect } from 'react-redux'
import { Redirect } from 'react-router-dom'
import UserBlogs from '../components/UserBlogs'
import { initUsers } from '../store/actions/usersActions'

const User = props => {

  const userId = props.match.params.id
  const user = props.users.find(u => u.id === userId)

  return (
    <>
      <UserBlogs user={user} />
    </>
  )

}

const mapStateToProps = state => {
  return {
    users: state.users,
    auth: state.auth
  }
}

const mapDispatchToProps = dispatch => {
  return {
    initUsers: () => dispatch(initUsers())
  }
}


export default connect(
  mapStateToProps,
  mapDispatchToProps
)(User)

