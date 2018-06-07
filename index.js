// Library Code
function createStore(reducer) {
  // The store should have four parts
  // 1. The state
  // 2. Get the state
  // 3. Listen to changes on the state
  // 4. Update the state

  let state
  let listeners = []

  const getState = () => state

  const subscribe = (listener) => {
    listeners.push(listener)
    return () => {
      listeners = listeners.filter((l) => l !== listener)
    }
  }

  const dispatch = (action) => {
    state = reducer(state, action)
    listeners.forEach( listener => listener() )
  }

  return {
    getState,
    subscribe,
    dispatch
  }
}

// App Code

function todos (state = [], action) {
  switch (action.type) {
    case 'ADD_TODO':
      return state.concat([action.todo])

    case 'REMOVE_TODO':
      return state.filter( (todo) => todo.id !== action.id)
    
    case 'TOGGLE_TODO':
      return state.map( (todo) => todo.id !== action.id ? todo :
        Object.assign({}, todo, { completed: !(todo.completed) })    
      )
    default:
      return state
  }
}


const store = createStore(todos)

store.subscribe(() => {
  console.log("The new state is: ", store.getState())
})

const unsubscribe = store.subscribe(() => {
  console.log("The store changed.")
})

store.dispatch({
  type: 'ADD_TODO',
  todo: {
    id: 0,
    name: 'elemento 1',
    completed: false
  }
})

store.dispatch({
  type: 'TOGGLE_TODO',
  id: 0
})

store.dispatch({
  type: 'REMOVE_TODO',
  id: 0
})