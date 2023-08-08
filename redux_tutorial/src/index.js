// REDUX 
// https://redux.js.org/

import React from 'react'
import ReactDOM from 'react-dom/client'

import { createStore } from 'redux'
//import { configureStore } from '@reduxjs/toolkit'

// const action = {
//   type:"INCREMENT"
// }

// const counterReducer = (state=0, action) => {
//   if (action.type === 'INCREMENT') {
//     return state + 1
//   } else if (action.type === 'DECREMENT') {
//     return state - 1
//   } else if (action.type === 'ZERO') {
//     return 0
//   }

//   return state
// }

// USING SWITCH STATEMENT - the most common approach in writing a reducer.

const counterReducer = (state = 0, action) => {
  switch (action.type) {
    case 'INCREMENT':
      return state + 1
    case 'DECREMENT':
      return state - 1
    case 'ZERO':
      return 0
    default: // if none of the above matches, code comes here
      return state
  }
}

const store = createStore(counterReducer)
console.log(store.getState()) //https://redux.js.org/api/store#getstate // 0
store.dispatch({ type: 'INCREMENT' }) //https://redux.js.org/api/store#dispatchaction
store.dispatch({ type: 'INCREMENT' })
store.dispatch({ type: 'INCREMENT' })
console.log(store.getState()) // 3
store.dispatch({ type: 'ZERO' })
store.dispatch({ type: 'DECREMENT' })
console.log(store.getState()) // -1

//const store = createStore(counterReducer)
//const store = configureStore(counterReducer)

const App = () => {
  return (
    <div>
      <div>
        <h1>Redux Counter App</h1>
      </div>
      <div>
        {store.getState()} 
      </div>
      <button 
        onClick={e => store.dispatch({ type: 'INCREMENT' })}
      >
        plus
      </button>
      <button
        onClick={e => store.dispatch({ type: 'DECREMENT' })}
      >
        minus
      </button>
      <button 
        onClick={e => store.dispatch({ type: 'ZERO' })}
      >
        zero
      </button>
    </div>
  )
}

const root = ReactDOM.createRoot(document.getElementById('root'))

const renderApp = () => {
  root.render(<App />)
}

renderApp()

// The third important method the store has is subscribe, 
// which is used to create callback functions the store calls whenever an 
// action is dispatched to the store.

store.subscribe(renderApp) //https://redux.js.org/api/store#subscribelistener
