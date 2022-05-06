import React from 'react'
import Contacts from '../Components/Contacts/Contacts'
import Footer from '../Components/Footer/Footer'
import Header from '../Components/Header/Header'
import Messeges from '../Components/Messeges/Messeges'
import Container from 'react-bootstrap/Container';
import { io } from 'socket.io-client'
import axios from 'axios'

const chatsStyle = {
    display: "flex",
    flexWrap: "wrap",
    justifyContent: "center",
    height: "38rem"

}


const chat = () => {

    try {

        const Socket = io('http://localhost:4000/')

        console.log(Socket);

        Socket.emit("message", {"sender": "final", "receiver": "final", "message": "**************************************"})

        Socket.on("message", (data) => {
            console.log(data);
        })

        
    } catch (error) {

        console.log("/////////////////////////////////////////")
        
    }


    return (
        <>
            <Header />
            <Container style={{ maxWidth: "1236px", padding: "2rem 0rem 1.5rem 0rem" }}>
                <div style={chatsStyle}>
                    <Contacts />
                    <Messeges />

                </div>
            </Container>
            <Footer />
        </>
    )
}

export default chat