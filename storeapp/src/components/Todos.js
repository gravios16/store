import React from "react"
import { connect } from "react-redux"
import List from "./List"

import {
  handleAddTodo,
  handleToggleTodo,
  handleDeleteTodo
} from "../actions/todos"

class Todos extends React.Component {
  addItem = (e) => {

    e.preventDefault()
    this.props.dispatch(handleAddTodo(
      this.input.value,
      () => this.input.value = ''
    ))

  }

  toggleItem = (id) => {

    this.props.dispatch(handleToggleTodo(id))

  }

  removeItem = (todo) => {

    this.props.dispatch(handleDeleteTodo(todo))

  }

  render() {
    return (
      <div>
        <h1>TODOS</h1>
        <input
          type="text"
          placeholder="Add Todo"
          ref={(input) => this.input = input}
        />
        <button onClick={this.addItem}>
          Add Todo
        </button>
        <List
          items={this.props.todos}
          remove={this.removeItem}
          toggle={this.toggleItem}
        />
      </div>
    )
  }
}

export default connect((state) => ({
  todos: state.todos
}))(Todos)