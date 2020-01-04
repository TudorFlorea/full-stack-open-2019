import React, { useEffect } from 'react'
import { BrowserRouter, Switch, Route } from 'react-router-dom'
import { connect } from 'react-redux'
import { Spinner } from 'react-bootstrap'

import { initAuth, logout } from './store/actions/authActions'
import './App.css'
import Login from './pages/Login'
import Dashboard from './pages/Dashboard'
import Users from './pages/Users'
import User from './pages/User'
import BlogPage from './pages/BlogPage'
import Signup from './pages/Signup'
import Nav from './components/Nav'
import Message from './components/Message'

const App = props => {

  useEffect(() => {
    props.initAuth()
  }, [])

  return (
    <div className="container App">
      {props.auth.isReady ? (
        <>
          <BrowserRouter>
            <Nav user={props.auth.user} onLogout={props.logout} />
            {props.notification && <Message notification={props.notification} />}
            <Switch>
              <Route path="/" exact component={Dashboard} />
              <Route path="/login" exact component={Login} />
              <Route path="/signup" exact component={Signup} />
              <Route path="/users" exact component={Users} />
              <Route path="/users/:id" component={User} />
              <Route path="/blogs/:id" component={BlogPage} />
            </Switch>
          </BrowserRouter>
        </>
      ) : (
        <Spinner animation="border" role="status">
          <span className="sr-only">Loading...</span>
        </Spinner>
      )}
    </div>
  )
}

const mapStateToProps = state => {
  return {
    auth: state.auth,
    notification: state.notification
  }
}

const mapDispatchToProps = dispatch => {
  return {
    initAuth: () => dispatch(initAuth()),
    logout: () => dispatch(logout())
  }
}

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(App)
