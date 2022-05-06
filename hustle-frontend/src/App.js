import React, { useEffect, useState } from 'react';
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Home from './Pages/Home';
import { useDispatch } from 'react-redux';
import ProductDetail from './Pages/ProductDetail'
import Chat from './Pages/Chat'
import axios from 'axios';

// import { io } from 'socket.io-client'



const App = () => {





  const dispatch = useDispatch()

  return (
    <>
      <BrowserRouter>
        <Routes>
          <Route exact path="/" element={<Home />} />
          <Route path="/service/:id" element={<ProductDetail />} />
          <Route path="/chat" element={<Chat />} />
        </Routes>
      </BrowserRouter>
    </>
  );
}

export default App;
