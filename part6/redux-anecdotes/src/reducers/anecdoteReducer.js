import AnecdotesService from '../services/anecdotes';
import {createNotification} from './notificationReducer';

export const addAnecdote = (data) => {
  return async dispatch => {
    const anecdote = await AnecdotesService.newAnecdote(data);
    dispatch({
      type: 'NEW_ANECDOTE',
      data: anecdote
    });
    dispatch(createNotification(`You created "${anecdote.content}"`, 5));
  }
}

export const vote = id => {
  return async (dispatch, getState) => {
    const anecdotes = getState().anecdotes;
    const anecdoteToChange = anecdotes.find(anecdote => anecdote.id === id);
    const changedAnecdote = {
      ...anecdoteToChange,
      votes: ++anecdoteToChange.votes
    };
    const response = await AnecdotesService.changeAnecdote(changedAnecdote);
    dispatch({
      type: 'VOTE',
      data: {
        anecdote: response
      }
    })
    dispatch(createNotification(`You voted "${response.content}"`, 5));
  }
}

export const initAnecdotes = () => {
  return async dispatch => {
    const anecdotes = await AnecdotesService.getAll();
    dispatch({
      type: "INIT_ANECDOTES",
      data: {
        anecdotes
      }
    })
  };
}

const initialState = []

const reducer = (state = initialState, action) => {
  console.log('state now: ', state)
  console.log('action', action)

  switch(action.type) {
    case "VOTE":
      const anecdoteToChange = action.data.anecdote;
      return state.map(anecdote => {
        return anecdote.id === anecdoteToChange.id ? anecdoteToChange: anecdote;
      });

    case "INIT_ANECDOTES":
      return [...action.data.anecdotes]

    case "NEW_ANECDOTE":
      return [
        ...state,
        action.data
    ];

    default:
      return state;
  }
}

export default reducer