import { NEGOTIATION_STATUS_CHANGED } from '../Constants/Chat.Constants.js'

export const chatsNegotiationStatus = data =>
    async (dispatch, getState) => {


        const updatedMessage = getState().userMessages.map(curr => {
            if (curr._id.$oid == data._id.$oid) return { ...data }
            return curr
        })

        dispatch({
            type: NEGOTIATION_STATUS_CHANGED,
            payload: updatedMessage
        })

        console.log(updatedMessage);

    }
