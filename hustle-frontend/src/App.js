import Chat from './Pages/Chat'
import Home from './Pages/Home';
import { io } from 'socket.io-client';
import { CHAT_SERVER_URL } from './Utils/Urls';
import ProductDetail from './Pages/ProductDetail'
import React, { useEffect, useState } from 'react';
import { decodeJwtToken } from './Utils/decode.jwt';
import Messeges from './Components/Messeges/Messeges';
import { useWindowSize } from './Utils/FindScreenWidth'
import { useSelector, useDispatch } from "react-redux";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import { contacts, receivedMessage, setSioInstance } from './Redux/Actions/socket.actions';

const App = () => {
  const dispatch = useDispatch()
  const screenSize = useWindowSize()

  const userStatus = useSelector(state => state.userStatus)
  const userListenTo = useSelector(state => state.userListenTo)
  const state = useSelector(state => state)

  useEffect(() => {

    const user = decodeJwtToken() // get user from jwt token
    if (user) {

      try {

        const Socket = io(CHAT_SERVER_URL); // connect to socket io

        dispatch(setSioInstance(Socket)); // set socket io instance in the redux state

        Socket.emit('set_online', { username: user }); // set username with socket io for set user to be online

        Socket.on('messages', (data) => {

          const message = JSON.parse(data.message)

          if (parseInt(message.conversation_id) == parseInt(userListenTo.conversation_id)) {
            dispatch(receivedMessage(message))
          }
        })

      } catch (err) {
        console.log(err);
      }
    }
  }, [userStatus, userListenTo])


  return (
    <>
      <BrowserRouter>
        <Routes>

          <Route exact path="/" element={<Home />} />
          <Route path="/service/:id" element={<ProductDetail />} />
          <Route path="/chat" element={<Chat />} />

          {/* show messages in smalll screen devices only if the size of window is less tha 700 this route will work */}
          {screenSize < 700 && <Route path="/messages" element={<Messeges />} />}

        </Routes>
      </BrowserRouter>
    </>
  );
}

export default App;
