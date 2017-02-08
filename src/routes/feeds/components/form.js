import React from 'react'
import { connect } from 'react-redux'
//import { addTodo } from '../actions'

//let AddTodo = ({onAddName, dispatch }) => {
let AddForm = ({addNewChannel,bar, dispatch}) => {
  let input
  let inputurl
  //let AddName={onAddName}
//  AddName()
  return (
    <div>
      <form onSubmit={e => {
        e.preventDefault()
        if (!input.value.trim()) {
          return
        }
      //  console.log('onAddName', addNewChannel)
      //  console.log('e ', inputurl.value)
        //alert('wait')
        addNewChannel({url: inputurl.value, name : input.value})
        input.value = ''
        inputurl.value = ''
      }}>
        <input ref={node => {
          input = node
        }} />
        <input ref={node => {
          inputurl = node
        }} />
        <button type="submit">
          Add Todo
        </button>
      </form>
    </div>
  )
}
AddForm = connect()(AddForm)

export default AddForm
