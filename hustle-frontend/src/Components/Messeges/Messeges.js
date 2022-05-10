import './Messeges.css'
import axios from 'axios'
import Button from 'react-bootstrap/esm/Button'
import React, { useEffect, useState } from 'react'
import { useSelector, useDispatch } from 'react-redux'
import { GET_MESSAGES_URL, SEND_MESSAGES_URL } from '../../Utils/Urls'
import { getMessage, sendMessages } from "../../Redux/Actions/socket.actions"

function Messeges() {
  const dispatch = useDispatch()

  const [typedMessage, setTypedMessage] = useState("")
  let [otherUser, setOtherUser] = useState(null)


  const userMessages = useSelector(state => state.userMessages)
  const user = useSelector(state => state.userStatus)
  const listenTo = useSelector(state => state.userListenTo)
  const userContacts = useSelector(state => state.userContacts)




  useEffect(() => {
    if (listenTo) {
      dispatch(getMessage())

      console.log(listenTo);
      setOtherUser(
        userContacts.filter((user) => user.id == listenTo)[0]
      )

      console.log(otherUser, 'other user');

    }
  }, [listenTo])




  return (
    <>

      <div className='messeges-style'>
        <div className='messeges-header'>
          <h3>{otherUser && otherUser.username}</h3>
        </div>

        <div className='show-messeges'>
          {
            userMessages.map((data, index) =>
              data.sender === user ? <p key={index} style={{ textAlign: "end" }}>{data.message}</p> : <p key={index}>{data.message}</p>
            )
          }
        </div>

        {
          listenTo &&
          <>
            <div style={{ padding: "7px" }}>
              <input value={typedMessage} type="text" style={{ width: "100%", height: "45px" }} onChange={(e) => setTypedMessage(e.target.value)} />
            </div>

            {/* create offer */}
            <div style={{ padding: "7px", display: "flex", justifyContent: "space-between" }}>
              <Button variant="outline-success">Create an offer</Button>{' '}

              {/* send message */}
              <Button variant="primary" onClick={() => {
                if (typedMessage) {
                  dispatch(sendMessages(
                    { sender: user, receiver: listenTo, message: typedMessage }
                  ))
                  setTypedMessage("")
                }
              }}>Send</Button>{' '}

            </div>
          </>
        }

      </div>

    </>
  )
}

export default Messeges