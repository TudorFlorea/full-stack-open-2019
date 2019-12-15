import React from 'react';
import {connect} from 'react-redux';
import {vote} from "../reducers/anecdoteReducer";

const AnecdoteList = (props) => {

    const anecdotes = props.anecdotes;

    const onVote = (anecdote) => {
        props.vote(anecdote.id);
    }

    return (
        <>
            {anecdotes.map(anecdote =>
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

const sortAnecdotes = anecdotes => {
    return anecdotes.sort((a, b) => {
        return b.votes - a.votes;
    });
}

const filterAnecdotes = (anecdotes, contentFilter) => {
    return anecdotes.filter((anecdote) => anecdote.content.indexOf(contentFilter) !== -1);
}

const mapStateToProps = state => {
    return {
        anecdotes: sortAnecdotes(filterAnecdotes(state.anecdotes, state.filter.filterValue))
    }
}

const mapDispatchToProps = dispatch => {
    return {
        vote: id => {dispatch(vote(id))}
    }
}

export default connect(
    mapStateToProps,
    mapDispatchToProps
)(AnecdoteList);