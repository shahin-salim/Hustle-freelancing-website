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

const App = () => {
  const dispatch = useDispatch()

  const userStatus = useSelector(state => state.userStatus)
  const userListenTo = useSelector(state => state.userListenTo)

  const screenSize = useWindowSize()

  useEffect(() => {


    const user = decodeJwtToken()
    if (user) {
      try {
        const Socket = io('http://localhost:4000/');
        console.log(Socket);

        // set socket io instance in the redux state
        dispatch(setSioInstance(Socket))

        // set username with socket io for set user to be online
        Socket.emit('set_online', { username: user });

        Socket.on('messages', (data) => {
          const message = JSON.parse(data.message)
          if (message.sender == userListenTo) {
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
