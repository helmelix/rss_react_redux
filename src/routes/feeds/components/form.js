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
        addNewChannel({url: inputurl.value, name : input.value})
        input.value = ''
        inputurl.value = ''
      }}>
        <div className="form-group" >
            <label for="name">Name</label>
            <input id="name" ref={node => {
                input = node
              }} />
        </div>
        <div className="form-group" >
            <label for="url">Url</label>
            <input ref={node => {
              inputurl = node
            }} />
        </div>
        <div className="form-group" >
            <button type="submit">
              Add Channel
            </button>
        </div>
      </form>
    </div>
  )
}
AddForm = connect()(AddForm)

export default AddForm
