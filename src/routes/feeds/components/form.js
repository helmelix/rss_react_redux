import React from 'react'
import { connect } from 'react-redux'

let AddForm = ({addNewChannel,bar, dispatch}) => {
  let input
  let inputurl

  return (
    <div className="space_top ">
      <form onSubmit={e => {
        e.preventDefault()
        if (!input.value.trim()||!inputurl.value.trim()) {
          return
        }
        addNewChannel({url: inputurl.value, name : input.value})
        input.value = ''
        inputurl.value = ''
      }}>
        <div className="form-group" >
            <label htmlFor="name"  >Name</label>
            <input className="form-control" id="name" ref={node => {
                input = node
              }} />
        </div>
        <div className="form-group " >
            <label htmlFor="url">Url</label>
            <input className="form-control" id="url" ref={node => {
              inputurl = node
            }} />
        </div>
        <div className="form-group" >
            <button type="submit" className="btn btn-default">
              Add Channel
            </button>
        </div>
      </form>
    </div>
  )
}
AddForm = connect()(AddForm)

export default AddForm
