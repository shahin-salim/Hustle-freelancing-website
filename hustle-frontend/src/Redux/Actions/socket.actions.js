import { decodeJwtToken } from "../../Utils/decode.jwt"
import { LISTENING_TO_REPLAY, MESSAGES, RECEIVED_MESSAGES, SEND_MESSAGES, SET_MESSEGES } from "../Constants/Socket"
import { SET_SOCKET_IO, SET_CONTACTS } from "../Constants/Socket"
import { io } from "socket.io-client"
import axios from "axios"
import * as Qs from 'qs'
import { GET_MESSAGES_URL, GET_USERS_IN_CONTACT_URL, GET_USER_DETAILS_URL, SEND_MESSAGES_URL } from "../../Utils/Urls"
import { CURRENT_VIEWING_SERVICE } from "../Constants/Services.Contact"

// set the incoming messeges in the messege state
export const chat = (messege) =>
    async (dispatch, getState) => {

        dispatch({
            type: SET_MESSEGES,
            payload: messege
        })

    }


// connect user with socket io
export const socketInstance = () =>
    async (dispatch, getState) => {
        const user = decodeJwtToken()
        if (user) {
            try {
                const Socket = io('http://localhost:4000/');

                // set socket io instance in the redux state
                dispatch({
                    type: SET_SOCKET_IO,
                    payload: Socket
                })

                // set username with socket io for set user to be online
                Socket.emit('set_online', { username: user });

            } catch (err) {
                console.log(err);
            }
        }
    }




// get the uer contact in the chat page
export const contacts = () =>
    async (dispatch, getState) => {

        const currState = getState()

        try {
            // get the users who have contact with the current user

            const response = await axios.get(GET_USERS_IN_CONTACT_URL, {
                params: {
                    id: currState.userStatus
                }
            })

            const datas = response.data

            let newDatas = []

            // remove current user from the array of object
            datas.map((d) => {
                if (d.user1.id == currState.userStatus) {
                    delete d.user1
                    newDatas = [...newDatas, { conversation_id: d.id, user: d.user2 }]
                } else {
                    delete d.user2
                    newDatas = [...newDatas, { conversation_id: d.id, user: d.user1 }]
                }

            })
            
            dispatch({
                type: SET_CONTACTS,
                payload: newDatas
            })

        } catch (error) {
            console.log(error);
        }
    }





// this action is used for find if the user is wating for any messege
// if user clicked in any spacifc user that user id is set to redux userLIstenTo state
// for show the messges in real time
export const listenForMessege = (userId) =>
    async (dispatch, getState) => {
        dispatch({
            type: LISTENING_TO_REPLAY,
            payload: userId
        })
    }



//  get messages with particular user
export const getMessage = () =>
    async (dispatch, getState) => {

        const state = getState()
        try {

            const { data } = await axios.get(
                GET_MESSAGES_URL, {
                params: {
                    conversation_id: state.userListenTo.conversation_id
                }
            })

            dispatch({
                type: MESSAGES,
                payload: data.messages
            })

        } catch (error) {
            console.log(error);
        }
    }



// set Socket io instance
export const setSioInstance = (Socket) =>
    async (dispatch, getState) => {
        dispatch({
            type: SET_SOCKET_IO,
            payload: Socket
        })
    }


// send message to another user and set the messsage in the state
export const sendMessages = (messege) =>
    async (dispatch, getState) => {

        try {
            const response = await axios.post(SEND_MESSAGES_URL, messege)

            dispatch({
                type: SEND_MESSAGES,
                payload: JSON.parse(response.data.messages)
            })
        } catch (error) {
            console.log(error);
        }
    }


// messages received from socket io set in redux state
export const receivedMessage = (message) =>
    async (dispatch, getState) => {

        dispatch({
            type: RECEIVED_MESSAGES,
            payload: message
        })

    }


// service user is the user currently current user viewing
// this is used to add to contact onClick the contact seller
// button if seller not in the chat before.
export const servicesUser = (userDetails) =>
    async (dispatch, getState) => {

        dispatch({
            type: CURRENT_VIEWING_SERVICE,
            payload: userDetails
        })

    }