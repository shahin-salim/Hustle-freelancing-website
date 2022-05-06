import React from 'react'
import './Messeges.css'
import Button from 'react-bootstrap/esm/Button'

function Messeges() {
  return (
    <div className='messeges-style'>
      <div className='messeges-header'>
        <h3>
          shahin salim
        </h3>
      </div>

      <div className='show-messeges'>
        <p>sdfsdff</p>
        <p>sdfsdff</p>
        <p>sdfsdff</p>
        <p>sdfsdff</p>
        <p>sdfsdff</p>
        <p>sdfsdff</p>
        <p>sdfsdff</p>
        <p>sdfsdff</p>
        <p>sdfsdff</p>
        <p>sdfsdff</p>
        <p>sdfsdff</p>
        <p>sdfsdff</p>
        <p>sdfsdff</p>
        <p>sdfsdff</p>
        <p>sdfsdff</p>
        <p>sdfsdff</p>
        <p>sdfsdff</p>
        <p>sdfsdff</p>
        <p>sdfsdff</p>
        <p>sdfsdff</p>
        <p>sdfsdff</p>
        <p>sdfsdff</p>
        <p>sdfsdff</p>
        <p>sdfsdff</p>

      </div>
      <div style={{ padding: "7px" }}>
        <input type="text" style={{ width: "100%", height: "45px" }} />
      </div>
      <div style={{ padding: "7px", display: "flex", justifyContent: "space-between" }}>
        <Button variant="outline-success">Create an offer</Button>{' '}
        <Button variant="primary">Send</Button>{' '}
      </div>

    </div>
  )
}

export default Messeges