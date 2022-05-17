import Chat from './Pages/Chat'
import Home from './Pages/Home';
import { io, Socket } from 'socket.io-client';
import { CHAT_SERVER_URL } from './Utils/Urls';
import ProductDetail from './Pages/ProductDetail'
import React, { useEffect, useState } from 'react';
import { decodeJwtToken } from './Utils/decode.jwt';
import Messeges from './Components/Messeges/Messeges';
import { useWindowSize } from './Utils/FindScreenWidth'
import { useSelector, useDispatch } from "react-redux";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import { chatsNegotiationStatus } from './Redux/Actions/Chat.Actions';
import { contacts, receivedMessage, setSioInstance } from './Redux/Actions/socket.actions';
import Orders from './Pages/Orders';

const App = () => {
  const dispatch = useDispatch()
  const screenSize = useWindowSize()

  const userStatus = useSelector(state => state.userStatus)
  const userListenTo = useSelector(state => state.userListenTo)
  const state = useSelector(state => state)
  const Socket = useSelector(state => state.Socket)


  useEffect(() => {

    // const user = decodeJwtToken() // get user from jwt token
    if (userStatus) {



      try {

        if (!Socket) {
          
          const Socket = io(CHAT_SERVER_URL);    // connect to socket io

          // set socket io instance in the redux state
          dispatch(setSioInstance(Socket));
        }

        // set username with socket io for set user to be online
        Socket && Socket.emit('set_online', { username: userStatus }); 


        // listen message event . this message gives the messages emitted using this user if
        Socket && Socket.on('messages', (data) => {

          // if the curr user listenign user id and the user sended this message 
          // this both ids are same the messsage will update in the redux state
          const message = JSON.parse(data.message)
          if (parseInt(message.conversation_id) == parseInt(userListenTo.conversation_id)) {
            dispatch(receivedMessage(message))
          }
        })


        //  listen any changes happen to offer status event
        Socket && Socket.on('offer_status', (data) => {
          dispatch(chatsNegotiationStatus(JSON.parse(data.message)))
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
          <Route path="/orders" element={<Orders />} />

          {/* show messages in smalll screen devices only if the size of window is less tha 700 this route will work */}
          {screenSize < 700 && <Route path="/messages" element={<Messeges />} />}

        </Routes>
      </BrowserRouter>
    </>
  );
}

export default App;
