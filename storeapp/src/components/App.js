import React from 'react'
import { connect } from 'react-redux'
import ConnectedTodos from './Todos'
import ConnectedGoals from './Goals'

import { handleReceiveData } from '../actions/shared.js'
 
class App extends React.Component {
  componentDidMount () {
    const { dispatch } = this.props
    dispatch(handleReceiveData())
  }

  render() {

    if (this.props.loading === true) {
      return <h3>Loading</h3>
    }

    return (
      <div>
        <ConnectedTodos />
        <ConnectedGoals />
      </div>
    )
  }
}

export default connect((state) => ({
  loading: state.loading
}))(App)