import React from 'react';

const Anecdote = (props) => {
    console.log(props);
    const {match, anecdotes} = props;
    const id = match.params.id;
    const anecdote = anecdotes.find(v => v.id === id);
    return (
        <div>
            <h2>{anecdote.content}</h2>
            <p>has {anecdote.votes} votes</p>
        </div>
    );
}

export default Anecdote;