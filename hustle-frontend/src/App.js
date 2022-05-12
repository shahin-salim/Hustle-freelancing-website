import React, { useEffect, useState } from 'react';
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Home from './Pages/Home';
import ProductDetail from './Pages/ProductDetail'
import Chat from './Pages/Chat'
import { useSelector, useDispatch } from "react-redux";
import { contacts, receivedMessage, setSioInstance } from './Redux/Actions/socket.actions';
import { decodeJwtToken } from './Utils/decode.jwt';
import { io } from 'socket.io-client';
import { useWindowSize } from './Utils/FindScreenWidth'
import Messeges from './Components/Messeges/Messeges';
import { CHAT_SERVER_URL } from './Utils/Urls';

const App = () => {

  const dispatch = useDispatch()

  const screenSize = useWindowSize()

  const userStatus = useSelector(state => state.userStatus)

  const userListenTo = useSelector(state => state.userListenTo)


  useEffect(() => {


    const user = decodeJwtToken()
    if (user) {
      try {
        const Socket = io(CHAT_SERVER_URL);
        console.log(Socket);

        // set socket io instance in the redux state
        dispatch(setSioInstance(Socket))

        // set username with socket io for set user to be online
        Socket.emit('set_online', { username: user });

        Socket.on('messages', (data) => {
          console.log(data);
          console.log("=====================================================");
          const message = JSON.parse(data.message)
          console.log(data);
          if (parseInt(message.sender) == parseInt(userListenTo)) {
            console.log("before dispatch");
            dispatch(receivedMessage(message))
          }
        })

      } catch (err) {
        console.log(err);
      }
    }

  }, [userStatus])


  return (
    <>
      <BrowserRouter>
        <Routes>
          <Route exact path="/" element={<Home />} />
          <Route path="/service/:id" element={<ProductDetail />} />
          <Route path="/chat" element={<Chat />} />
          {
            screenSize < 700 && <Route path="/messages" element={<Messeges />} />
          }
        </Routes>
      </BrowserRouter>
    </>
  );
}

export default App;
