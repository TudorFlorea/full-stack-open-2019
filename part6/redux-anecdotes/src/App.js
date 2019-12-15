import React from 'react';

const App = (props) => {
  const {store} = props;
  const anecdotes = store.getState()

  const vote = (id) => {
    console.log('vote', id)
      store.dispatch({
        type: "VOTE",
        data: {
          id
        }
      })
  }

  const sortAnecdotes = anecdotes => {
    return anecdotes.sort((a, b) => {
      return b.votes - a.votes;
    });
  }

  const addAnecdote = event => {
    event.preventDefault();
    const content = event.target.anecdote.value
    store.dispatch({
      type: 'NEW_ANECDOTE',
      data: {
        content
      }
    })
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
            <button onClick={() => vote(anecdote.id)}>vote</button>
          </div>
        </div>
      )}
      <h2>create new</h2>
      <form onSubmit={addAnecdote}>
        <div><input name="anecdote" /></div>
        <button type="submit">create</button>
      </form>
    </div>
  )
}

export default App