import React, { useState, useEffect } from 'react'
import {BrowserRouter, Switch, Route} from 'react-router-dom';
import {connect} from 'react-redux';

import {initAuth} from './store/actions/authActions';
import './App.css'
import Login from './pages/Login';
import Dashboard from './pages/Dashboard';
import Users from './pages/Users';
import User from './pages/User';
import BlogPage from './pages/BlogPage';

const App = props => {

  useEffect(() => {
    props.initAuth()
  }, []);

    return (
      <>
        {props.auth.isReady ? (
          <>
            <BrowserRouter>
              <Switch>
                <Route path="/" exact component={Dashboard} />
                <Route path="/login" exact component={Login} />
                <Route path="/users" exact component={Users} />
                <Route path="/users/:id" component={User} />
                <Route path="/blogs/:id" component={BlogPage} />
              </Switch>
            </BrowserRouter>
          </>
        ) : (
          <div>loading</div>
        )}
      </>
    )
}

const mapStateToProps = state => {
  return {
    auth: state.auth
  }
};

const mapDispatchToProps = dispatch => {
  return {
    initAuth: () => dispatch(initAuth())
  }
}

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(App);
