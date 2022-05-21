import { OPEN_MODAL, CLOSE_MODAL } from "../Constants/ModalConstant"


// open the modal also the which modal  
export const openModal = (data) =>
    async (dispatch, getState) => {
        console.log(data);
        dispatch({
            type: OPEN_MODAL,
            payload: data
        })
    }
    

// close the modal also the which modal  
export const closeModal = () =>
    async (dispatch, getState) => {
        dispatch({
            type: CLOSE_MODAL,
            payload: {}
        })
    }