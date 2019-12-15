import React from 'react';
import {connect} from 'react-redux';
import {addAnecdote} from "../reducers/anecdoteReducer"; 

const AnecdoteForm = (props) => {

    const onAddAnecdote = event => {
        event.preventDefault();
        const content = event.target.anecdote.value;
        event.target.anecdote.value = ''
        props.addAnecdote(content);
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
        addAnecdote: content => {dispatch(addAnecdote(content))}
    }
}

export default connect(
    null,
    mapDispatchToProps
)(AnecdoteForm);