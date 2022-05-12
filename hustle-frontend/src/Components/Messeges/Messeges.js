import './Messeges.css'
import axios from 'axios'
import Button from 'react-bootstrap/esm/Button'
import React, { useEffect, useState } from 'react'
import { useSelector, useDispatch } from 'react-redux'
import { GET_MESSAGES_URL, GET_SERVICE_URL, SEND_MESSAGES_URL } from '../../Utils/Urls'
import { getMessage, sendMessages } from "../../Redux/Actions/socket.actions"
import useTheAxios from '../../Axios/useAxios'
import Modal from '../Modal'
import MessageCotainer from '../MessageContainer/MessageCotainer'

function Messeges() {
  const useAxios = useTheAxios()

  const dispatch = useDispatch()

  const [openModal, setOpenModal] = useState({ bool: false })
  let [otherUser, setOtherUser] = useState(null)
  const [userPackges, setUserPackges] = useState([])
  const [typedMessage, setTypedMessage] = useState("")


  // console.log(useAxios);

  const userMessages = useSelector(state => state.userMessages)
  const user = useSelector(state => state.userStatus)
  const listenTo = useSelector(state => state.userListenTo)
  const userContacts = useSelector(state => state.userContacts)

  const MessagesInRightSide = {
    marginTop: "30px",
    display: "flex",
    justifyContent: "end"
  }


  const fetchPackgesInfo = async () => {
    try {
      const { data } = await useAxios.get("/services/")
      setUserPackges([...data])

    } catch (error) {
      console.log(error);
    }
  }


  useEffect(() => {

    if (listenTo) {

      dispatch(getMessage())

      setOtherUser(
        userContacts.filter((user) => user.id == listenTo)[0]
      )

    }

    fetchPackgesInfo()

  }, [listenTo])

  const handleSendMessage = () => {
    if (typedMessage) {

      dispatch(sendMessages(
        { sender: user, receiver: listenTo, message: typedMessage }
      ))

      setTypedMessage("")
    }
  }


  const handleCreateAnOffer = () => {

    setOpenModal({ bool: true, type: "createAnOffer" })

  }


  return (
    <>

      <div className='messeges-style'>
        <div className='messeges-header'>
          <h3>{otherUser && otherUser.username}</h3>
        </div>

        <div className='show-messeges'>
          {
            userMessages.map((data, index) =>

              data.sender === user ?

               <MessageCotainer styles={MessagesInRightSide} data={data} />
                :
                <MessageCotainer styles={{ marginTop: "30px" }} data={data} />
            )
          }
        </div>

        {
          listenTo &&
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

              {openModal.bool && <Modal open={openModal} setOpen={setOpenModal} />}

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