import axios from 'axios';

const baseUrl = 'http://localhost:3001/anecdotes'

const getId = () => (100000 * Math.random()).toFixed(0)

const getAll = async () => {
    const response = await axios.get(baseUrl);
    return response.data
}

const newAnecdote = async (content) => {
    const newObject = {
        content,
        id: getId(),
        votes: 0
    }
    const response = await axios.post(baseUrl, newObject);
    return response.data;
}

const changeAnecdote = async anecdote => {
    const response = await axios.put(`${baseUrl}/${anecdote.id}`, anecdote);
    return response.data
}

export default {
    getAll,
    newAnecdote,
    changeAnecdote
}