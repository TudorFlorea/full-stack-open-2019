import React from 'react';
import {connect} from 'react-redux';
import {addAnecdote} from "../reducers/anecdoteReducer"; 
import {createNotification} from '../reducers/notificationReducer';
import AnecdotesService from '../services/anecdotes';

const AnecdoteForm = (props) => {

    const onAddAnecdote = event => {
        event.preventDefault();
        const content = event.target.anecdote.value
        AnecdotesService
            .newAnecdote(content)
            .then(data => {
                props.addAnecdote(data);
                props.createNotification(`You've created "${data.content}"`);
            });
        
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

const mapDispatchToProps = dispatch => {
    return {
        addAnecdote: content => {dispatch(addAnecdote(content))},
        createNotification: content => {dispatch(createNotification(content))}
    }
}

export default connect(
    null,
    mapDispatchToProps
)(AnecdoteForm);