import React from 'react';

import AnecdoteForm from './components/AnecdoteForm';
import AnecdoteList from './components/AnecdoteList';

const App = (props) => {
  const {store} = props;
  return (
    <div>
      <h2>Anecdotes</h2>
      <AnecdoteForm store={store} />
      <AnecdoteList store={store} />
    </div>
  )
}

export default App