/**
 *  `push` method - Bad idea because it breaks the basic 
 *   assumption of Redux reducer that reducers must be pure functions.
 * 
 *   Pure functions are such, that they do not cause any side effects and 
 *   they must always return the same response when called with the same parameters.
 * 
 * 
*/

// const noteReducer = (state = [], action) => {
//   if (action.type === 'NEW_NOTE') {
//     state.push(action.payload) 
//     state.concat(action.payload) 
//   }

//   return state
// }

/**
 * `concat` method - creates a new array, 
 * which contains all the elements of the old array and the new element:
 * 
 */

// `push` mutates the original array and should be avoided in Redux to maintain immutability.
// `concat` creates a new array and is preferred in Redux to maintain immutability when adding elements to an array.

// const noteReducer = (state = [], action) => {
//   if (action.type === 'NEW_NOTE') {
//     return state.concat(action.payload)
//   }

//   return state
// }

const noteReducer = (state = [], action) => {
  switch(action.type) {
    case 'NEW_NOTE':
      return state.concat(action.payload)
    case 'TOGGLE_IMPORTANCE': {
      const id = action.payload.id
      const noteToChange = state.find(n => n.id === id)
      const changedNote = { 
        ...noteToChange, 
        important: !noteToChange.important 
      }
      return state.map(note =>
        note.id !== id ? note : changedNote 
      )
     }
    default:
      return state
  }
}


const store = createStore(noteReducer)

store.dispatch({
  type: 'NEW_NOTE',
  payload: {
    content: 'the app state is in redux store',
    important: true,
    id: 1
  }
})

store.dispatch({
  type: 'NEW_NOTE',
  payload: {
    content: 'state changes are made with actions',
    important: false,
    id: 2
  }
})

const App = () => {
  return(
    <div>
      <ul>
        {store.getState().map(note=>
          <li key={note.id}>
            {note.content} <strong>{note.important ? 'important' : ''}</strong>
          </li>
        )}
        </ul>
    </div>
  )
}
