import React, {useEffect} from 'react';
import {connect} from 'react-redux';
import AnecdoteForm from './components/AnecdoteForm';
import AnecdoteList from './components/AnecdoteList';
import Notification from './components/Notification';
import Filter from './components/Filter';
import {initAnecdotes} from './reducers/anecdoteReducer';

const App = (props) => {
  useEffect(() => {
    props.initAnecdotes();
  }, []);
  return (
    <div>
      <h2>Anecdotes</h2>
      <Filter />
      <Notification />
      <AnecdoteForm />
      <AnecdoteList />
    </div>
  )
}

const mapDispatchToProps = dispatch => {
  return {
    initAnecdotes: anecdotes => { dispatch(initAnecdotes(anecdotes)) }
  }
}

export default connect(
  null,
  mapDispatchToProps
)(App)