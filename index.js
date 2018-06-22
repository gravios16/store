var id = 0;

const generateId = () => {
  let lastID = id
  id++
  return lastID
}

// App Code

const ADD_TODO = 'ADD_TODO'
const REMOVE_TODO = 'REMOVE_TODO'
const TOGGLE_TODO = 'TOGGLE_TODO'

const ADD_GOAL = 'ADD_GOAL'
const REMOVE_GOAL = 'REMOVE_GOAL'

const RECEIVE_DATA = 'RECEIVE_DATA'

function addTodoAction (todo) {
  return {
    type: ADD_TODO,
    todo
  }
}

function removeTodoAction (id) {
  return {
    type: REMOVE_TODO,
    id: id
  }
}

function toggleTodoAction (id) {
  return {
    type: TOGGLE_TODO,
    id: id
  }
}

function addGoalAction (goal) {
  return {
    type: ADD_GOAL,
    goal: goal
  }
}

function removeGoalAction (id) {
  return {
    type: REMOVE_GOAL,
    id: id
  }
}

function receiveDataAction (todos, goals) {
  return {
    type: RECEIVE_DATA,
    todos,
    goals
  }
}



function handleAddTodo (name, cb) {

  return dispatch => {
    return API.saveTodo(name)
    .then((todo) => {
      dispatch(addTodoAction(todo))
      cb()
    })
    .catch(() => {
      alert('There was an error. Try again.')
    })
  }

}

function handleToggleTodo (id) {

  return dispatch => {

    dispatch(toggleTodoAction(id))

    return API.saveTodoToggle(id)
      .catch(() => {
        dispatch(toggleTodoAction(id))
        alert('An error occurred. Try again.')
      })
  }

}

function handleDeleteTodo (todo) {

  return dispatch => {

    dispatch(removeTodoAction(todo.id))

    return API.deleteTodo(todo.id)
      .catch(() => {
        dispatch(addTodoAction(todo))
        alert('An error occurred. Try again.')
      })
  }

}

function handleAddGoal (name, cb) {

  return dispatch => {
    API.saveGoal(name)
    .then((goal) => {
      dispatch(addGoalAction(goal))
      cb()
    })
    .catch(() => {
      alert('There was an error. Try again.')
    })
  }

}

function handleDeleteGoal (goal) {

  return dispatch => {

    dispatch(removeGoalAction(goal.id))

    return API.deleteGoal(goal.id)
      .catch(() => {
        dispatch(addGoalAction(goal))
        alert('An error occurred. Try again.')
      })
  }

}

function handleReceiveData() {

  return dispatch => {
    return Promise.all([
      API.fetchTodos(),
      API.fetchGoals()
    ]).then(([todos, goals]) => {
      dispatch(receiveDataAction(todos, goals))
    })
  }

}

function todos (state = [], action) {
  switch (action.type) {
    case ADD_TODO:
      return state.concat([action.todo])

    case REMOVE_TODO:
      return state.filter( (todo) => todo.id !== action.id)
    
    case TOGGLE_TODO:
      return state.map( (todo) => todo.id !== action.id ? todo :
        Object.assign({}, todo, { completed: !(todo.completed) })    
      )

    case RECEIVE_DATA:
      return action.todos

    default:
      return state
  }
}

function goals (state = [], action) {
  switch (action.type) {
    case ADD_GOAL:
      return state.concat([action.goal])

    case REMOVE_GOAL:
      return state.filter( (goal) => goal.id !== action.id)

    case RECEIVE_DATA:
      return action.goals

    default:
      return state
  }
}

function loading (state = true, action) {
  switch (action.type) {
    case RECEIVE_DATA:
      return false

    default:
      return state
  }
}

const checker = (store) => (next) => (action) => {
  if (
    action.type === ADD_TODO &&
    action.todo.name.toLowerCase().includes("bitcoin")
  ) {
    return alert("Nope. That's a bad idea.")
  }

  if (
    action.type === ADD_GOAL &&
    action.goal.name.toLowerCase().includes("bitcoin")
  ) {
    return alert("Nope. That's a bad idea.")
  }

  return next(action)
}

const logger =  (store) => (next) => (action) => {
  console.group(action.type)
    console.log('The action is: ', action)
    const result = next(action)
    console.log('The new state :', store.getState())
  console.groupEnd()
  return result
}

/*
// REDUX THUNK EXAMPLE
const thunk = (store) => (next) => (action) => {
  if (typeof action === 'function') {
    return action(store.dispatch)
  }

  return next(action)
}
*/
const store = Redux.createStore(Redux.combineReducers({
  todos,
  goals,
  loading
}), Redux.applyMiddleware(ReduxThunk.default, checker, logger))



//Vanilla JS UI
/*
function addTodo() {
  const input = document.getElementById('todo')
  const name = input.value
  input.value = ''

  store.dispatch(addTodoAction({
    name,
    completed: false,
    id: generateId()
  }))
}

function addGoal() {
  const input = document.getElementById('goal')
  const name = input.value
  input.value = ''

  store.dispatch(addGoalAction({
    name,
    id: generateId()
  }))
}

document.getElementById('todoBtn')
  .addEventListener('click', addTodo)

document.getElementById('goalBtn')
  .addEventListener('click', addGoal)


store.subscribe(() => {
  const { todos, goals } = store.getState()

  document.getElementById('todos').innerHTML = ''
  document.getElementById('goals').innerHTML = ''

  todos.forEach(addTodoToDOM)
  goals.forEach(addGoalToDOM)

  //console.log("The new state is: ", store.getState())
})

function createRemoveButton (onClick) {
  const removeBtn = document.createElement('button')
  removeBtn.innerHTML = 'X'
  removeBtn.addEventListener('click', onClick)

  return removeBtn
}

function addTodoToDOM (todo) {
  const node = document.createElement('li')
  const text = document.createTextNode(todo.name)
  const removeBtn = createRemoveButton(() => { store.dispatch( removeTodoAction(todo.id) ) })

  node.appendChild(text)
  node.appendChild(removeBtn)
  node.style.textDecoration = todo.completed ? 'line-through' : 'none'
  node.addEventListener('click', () => {
    store.dispatch(toggleTodoAction(todo.id))
  })

  document.getElementById('todos')
    .appendChild(node)

}

function addGoalToDOM (goal) {
  const node = document.createElement('li')
  const text = document.createTextNode(goal.name)
  const removeBtn = createRemoveButton(() => { store.dispatch( removeGoalAction(goal.id) ) })

  node.appendChild(text)
  node.appendChild(removeBtn)
  
  document.getElementById('goals')
    .appendChild(node)
}
*/