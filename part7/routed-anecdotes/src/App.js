import React, { useState } from 'react';
import {BrowserRouter as Router, Switch, Route} from 'react-router-dom';

import AnecdoteList from './components/AnecdoteList';
import Anecdote from './components/Anecdote';
import About from './components/About';
import CreateNew from './components/CreateNew';
import Footer from './components/Footer';
import Menu from './components/Menu';
import Notification from './components/Notification';


const App = () => {
  const [anecdotes, setAnecdotes] = useState([
    {
      content: 'If it hurts, do it more often',
      author: 'Jez Humble',
      info: 'https://martinfowler.com/bliki/FrequencyReducesDifficulty.html',
      votes: 0,
      id: '1'
    },
    {
      content: 'Premature optimization is the root of all evil',
      author: 'Donald Knuth',
      info: 'http://wiki.c2.com/?PrematureOptimization',
      votes: 0,
      id: '2'
    }
  ])

  const [notification, setNotification] = useState('')

  const addNew = (anecdote) => {
    anecdote.id = (Math.random() * 10000).toFixed(0)
    setAnecdotes(anecdotes.concat(anecdote))
    setNotification(`A new anecdote ${anecdote.content} created!`);
    setTimeout(() => {
      setNotification("");
    }, 10000)
  }

  const anecdoteById = (id) =>
    anecdotes.find(a => a.id === id)

  const vote = (id) => {
    const anecdote = anecdoteById(id)

    const voted = {
      ...anecdote,
      votes: anecdote.votes + 1
    }

    setAnecdotes(anecdotes.map(a => a.id === id ? voted : a))
  }

  return (
    <>
    <Router>
      <div>
        <Menu />
        <h1>Software anecdotes</h1>
        {notification && <Notification message={notification} />}
        <Switch>
          <Route path="/" exact render={() => <AnecdoteList anecdotes={anecdotes} />} />
          <Route path="/anecdotes/:id" render={(props) => <Anecdote match={props.match} anecdotes={anecdotes} />} />
          <Route path="/create" render={(props) => <CreateNew history={props.history} addNew={addNew} />} />
          <Route path="/about" render={() => <About /> } />
        </Switch>
        <Footer />
      </div>
    </Router>
    </>
  )
}

export default App;