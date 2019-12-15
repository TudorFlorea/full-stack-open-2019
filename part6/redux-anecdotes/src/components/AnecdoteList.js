import React from 'react';

import {vote} from "../reducers/anecdoteReducer"; 
import {createNotification} from '../reducers/notificationReducer';

const AnecdoteList = ({store}) => {

    const anecdotes = store.getState().anecdotes

    const onVote = (anecdote) => {
        store.dispatch(vote(anecdote.id))
        store.dispatch(createNotification(`You voted "${anecdote.content}"`))
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
                    <button onClick={() => onVote(anecdote)}>vote</button>
                </div>
                </div>
            )}
        </>
    )
}

export default AnecdoteList;