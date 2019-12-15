import React from 'react';

import {addAnecdote} from "../reducers/anecdoteReducer"; 

const AnecdoteForm = ({store}) => {

    const onAddAnecdote = event => {
        event.preventDefault();
        const content = event.target.anecdote.value
        store.dispatch(addAnecdote(content))
        event.target.anecdote.value = ''
      }

    return (
        <>
            <h2>create new</h2>
            <form onSubmit={onAddAnecdote}>
                <div><input name="anecdote" /></div>
                <button type="submit">create</button>
            </form>
        </>
    )
}

export default AnecdoteForm;