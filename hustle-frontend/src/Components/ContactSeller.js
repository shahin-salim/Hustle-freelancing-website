import React, { useState } from 'react'
import TextareaAutosize from '@mui/material/TextareaAutosize';
import Button from '@mui/material/Button';
import { useDispatch, useSelector } from 'react-redux';
import useTheAxios from '../Axios/useAxios';
import { ESTABLISH_CONNECTION } from '../Utils/Urls';
import axios from 'axios';
import * as Qs from 'qs'
import { useNavigate } from 'react-router-dom';

const mainDivStyle = {
  display: "flex",
  flexDirection: "column",
  padding: "35px",
}

const ContactSeller = ({ open, setOpen }) => {

  const user = useSelector(state => state.userStatus)

  const [message, setMessage] = useState("")
  const useAxios = useTheAxios()
  const navigate = useNavigate()

  const handleSendMeassage = async () => {
    try {

      const response = await useAxios.post(
        "http://localhost:4000/establish_connection",
        {
          params: {
            members: [user, open.otherUser]
          },
          message: message,
          paramsSerializer: function (params) {
            return Qs.stringify(params, { arrayFormat: 'repeat' })
          }
        })

      console.log(response);

      navigate("/chat")


    } catch (error) {
      console.log(error);
    }



  }


  return (
    <div style={mainDivStyle}>
      <TextareaAutosize
        minRows={3}
        placeholder="Enter Message"
        style={{ width: 200 }}
        onChange={(e) => setMessage(e.target.value)}
      />
      <Button onClick={handleSendMeassage} style={{ marginTop: "10px" }} variant="contained">Send Message</Button>
    </div>
  )
}

export default ContactSeller