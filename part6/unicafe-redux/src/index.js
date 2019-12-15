import React from 'react';
import ReactDOM from 'react-dom'
import { createStore } from 'redux'
import reducer from './reducer'

const store = createStore(reducer)

const App = () => {

  const action = type => {
    return () => {
      store.dispatch({
        type
      })
    }
  }

  return (
    <div>
      <button onClick={action("GOOD")}>good</button>
      <button onClick={action("OK")}>neutral</button>
      <button onClick={action("BAD")}>bad</button>
      <button onClick={action("ZERO")}>reset stats</button>
      <div>good {store.getState().good}</div>
      <div>neutral {store.getState().ok}</div>
      <div>bad {store.getState().bad}</div>
    </div>
  )
}

const renderApp = () => {
  ReactDOM.render(<App />, document.getElementById('root'))
}

renderApp()
store.subscribe(renderApp)