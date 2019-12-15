import React from 'react';

import {vote} from "../reducers/anecdoteReducer"; 

const AnecdoteList = ({store}) => {

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

    return (
        <>
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
        </>
    )
}

export default AnecdoteList;