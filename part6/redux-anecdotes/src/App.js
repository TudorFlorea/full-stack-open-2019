import React from 'react';

import {addAnecdote, vote} from "./reducers/anecdoteReducer"; 

const App = (props) => {
  const {store} = props;
  const anecdotes = store.getState()

  const onVote = (id) => {
    console.log('vote', id)
      store.dispatch(vote(id))
  }

  const sortAnecdotes = anecdotes => {
    return anecdotes.sort((a, b) => {
      return b.votes - a.votes;
    });
  }

  const onAddAnecdote = event => {
    event.preventDefault();
    const content = event.target.anecdote.value
    store.dispatch(addAnecdote(content))
    event.target.anecdote.value = ''
  }

  return (
    <div>
      <h2>Anecdotes</h2>
      {sortAnecdotes(anecdotes).map(anecdote =>
        <div key={anecdote.id}>
          <div>
            {anecdote.content}
          </div>
          <div>
            has {anecdote.votes}
            <button onClick={() => onVote(anecdote.id)}>vote</button>
          </div>
        </div>
      )}
      <h2>create new</h2>
      <form onSubmit={onAddAnecdote}>
        <div><input name="anecdote" /></div>
        <button type="submit">create</button>
      </form>
    </div>
  )
}

export default App