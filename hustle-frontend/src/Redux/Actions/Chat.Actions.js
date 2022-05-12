import { SEND_MESSAGE_AT_FIRST_TIME } from "../Constants/Chat.Constants"


export const addToContact = (message) =>
    async (dispatch, getState) => {
        console.log(message);
        console.log();
        dispatch({
            type: SEND_MESSAGE_AT_FIRST_TIME,
            payload: getState().servicesUserDetails
        })
    }