import React, { useEffect, useLayoutEffect, useState } from 'react';
import Contacts from '../Components/Contacts/Contacts';
import Footer from '../Components/Footer/Footer';
import Header from '../Components/Header/Header';
import Messeges from '../Components/Messeges/Messeges';
import Container from 'react-bootstrap/Container';
import { io } from 'socket.io-client';
import axios from 'axios';
import { useSelector, useDispatch } from 'react-redux'
import { socketInstance } from '../Redux/Actions/socket.actions';
import { useWindowSize } from '../Utils/FindScreenWidth'

const chatsStyle = {
	display: 'flex',
	flexWrap: 'wrap',
	justifyContent: 'center',
	height: '38rem'
};



const Chat = () => {


	const width = useWindowSize();

	console.log(width);



	useEffect(() => {


	}, [])






	return (
		<div>
			<Header />
			<Container style={{ maxWidth: '1236px', padding: '2rem 0rem 1.5rem 0rem' }}>
				<div style={chatsStyle}>
					<Contacts />
					{width > 700 && <Messeges />}
				</div>
			</Container>
			<Footer />
		</div>
	);
};

export default Chat;