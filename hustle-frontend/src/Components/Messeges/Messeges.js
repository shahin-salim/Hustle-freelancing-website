import './Messeges.css'
import axios from 'axios'
import Modal from '../Modal'
import useTheAxios from '../../Axios/useAxios'
import Button from 'react-bootstrap/esm/Button'
import React, { useEffect, useState } from 'react'
import { useSelector, useDispatch } from 'react-redux'
import MessageCotainer from '../MessageContainer/MessageCotainer'
import { getMessage, sendMessages } from "../../Redux/Actions/socket.actions"
import { GET_MESSAGES_URL, GET_SERVICE_URL, SEND_MESSAGES_URL, SERVICES_OF_THE_USER_URL } from '../../Utils/Urls'

const MessagesInRightSide = {
  marginTop: "30px",
  display: "flex",
  justifyContent: "end"
}


function Messeges() {

  const useAxios = useTheAxios()
  const dispatch = useDispatch()

  const [openModal, setOpenModal] = useState({ bool: false })
  let [otherUser, setOtherUser] = useState(null)
  const [userPackges, setUserPackages] = useState([])
  const [typedMessage, setTypedMessage] = useState("")

  const userMessages = useSelector(state => state.userMessages)
  const user = useSelector(state => state.userStatus)
  const userListenTo = useSelector(state => state.userListenTo)
  const userContacts = useSelector(state => state.userContacts)


  // fetch packages of the user
  const fetchPackgesInfo = async () => {

    try {

      const { data } = await useAxios.get(SERVICES_OF_THE_USER_URL)
      console.log(data);
      setUserPackages([...data])

    } catch (error) {
      console.log(error);
    }

  }


  // send message
  const handleSendMessage = () => {

    if (typedMessage) {

      dispatch(sendMessages({
        sender: user,
        conversation_id: userListenTo.conversation_id,
        message: typedMessage,
        receiver: userListenTo.user.id
      }))

      setTypedMessage("")
    }
  }

  useEffect(() => {

    if (userListenTo) {             // get messages if user is watching someones chat
      dispatch(getMessage())
      setOtherUser(userListenTo)
    }

    fetchPackgesInfo()

  }, [userListenTo])


  // open modal for create offer
  const handleCreateAnOffer = () => {
    setOpenModal({
      bool: true,
      type: "createAnOffer"
    })
  }


  return (
    <>
      {/* create an offer modal */}
      {openModal.bool && <Modal open={openModal} setOpen={setOpenModal} />}

      <div className='messeges-style'>
        <div className='messeges-header'>
          <h3>
            {otherUser && otherUser.user.username}
          </h3>
        </div>

        <div className='show-messeges'>
          {
            userMessages.map((data, index) =>
              data.sender === user ?

                <MessageCotainer
                  key={index}
                  styles={MessagesInRightSide}
                  data={data}
                />   // show messages in right side
                :
                <MessageCotainer
                  key={index}
                  styles={{ marginTop: "30px" }}
                  data={data}
                />   // show messages in left side
            )
          }
        </div>

        {
          userListenTo &&
          <>
            <div style={{ padding: "7px" }}>
              <input
                value={typedMessage}
                type="text" style={{ width: "100%", height: "45px" }}
                onChange={(e) => setTypedMessage(e.target.value)}
              />
            </div>

            {/* create offer */}
            <div style={{ padding: "7px", display: "flex", justifyContent: "space-between" }}>
              <Button variant="outline-success" onClick={handleCreateAnOffer}>Create an offer</Button>{' '}

              {/* send message */}
              <Button variant="primary" onClick={handleSendMessage}> Send</Button>{' '}

            </div>
          </>
        }

      </div>

    </>
  )
}

export default Messeges