import React from 'react';

import {vote} from "../reducers/anecdoteReducer"; 
import {createNotification} from '../reducers/notificationReducer';

const AnecdoteList = ({store}) => {

    const anecdotes = store.getState().anecdotes

    const filter = store.getState().filter.filterValue;

    const onVote = (anecdote) => {
        store.dispatch(vote(anecdote.id))
        store.dispatch(createNotification(`You voted "${anecdote.content}"`))
    }

    const sortAnecdotes = anecdotes => {
        return anecdotes.sort((a, b) => {
            return b.votes - a.votes;
        });
    }

    const filterAnecdotes = (anecdotes, contentFilter) => {
        return anecdotes.filter((anecdote) => anecdote.content.indexOf(contentFilter) !== -1);
    }

    const anecdotesToShow = sortAnecdotes(filterAnecdotes(anecdotes, filter));

    return (
        <>
            {anecdotesToShow.map(anecdote =>
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