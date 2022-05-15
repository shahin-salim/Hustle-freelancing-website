import { logoutTheUser } from "../Actions/token.action";
import { NEGOTIATION_STATUS_CHANGED } from "../Constants/Chat.Constants"
// import { ADD_NEW_USER_TO_CONTACT } from "../Constants/Chat.Constants";
import { LISTENING_TO_REPLAY, MESSAGES, RECEIVED_MESSAGES, SEND_MESSAGES, SET_CONTACTS, SET_MESSEGES } from "../Constants/Socket";
import { SET_SOCKET_IO } from "../Constants/Socket";

// set the messeges in the state
export const setIncomingMesseges = (state = null, { type, payload }) => {
    switch (type) {
        case SET_MESSEGES:
            return { ...state, payload }
        default:
            return state
    }
}


// set socket in redux Socket instance
export const setSocketIo = (state = null, { type, payload }) => {
    switch (type) {
        case SET_SOCKET_IO:
            return payload
        default:
            return state
    }
}

// people who have connection with the user
export const setContacts = (state = [], { type, payload }) => {
    switch (type) {
        case SET_CONTACTS:
            return [...payload]
        default:
            return state
    }
}

// if user click someone one chat that user id is set
// to redux state for real time updation of that chat
export const setListeningToThisUser = (state = null, { type, payload }) => {
    switch (type) {
        case LISTENING_TO_REPLAY:
            return payload
        default:
            return state
    }
}



// send messages user to user
export const setMessages = (state = [], { type, payload }) => {
    switch (type) {
        case MESSAGES:
            return [...payload]
        case SEND_MESSAGES:
            return [...state, payload]
        case RECEIVED_MESSAGES:
            return [...state, payload]
        case NEGOTIATION_STATUS_CHANGED:
            console.log("****^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^");
            
            console.log(payload);
            return [...payload]
        default:
            return state
    }
}