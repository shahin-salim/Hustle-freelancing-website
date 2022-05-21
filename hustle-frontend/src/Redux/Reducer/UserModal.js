
import { OPEN_MODAL, CLOSE_MODAL } from "../Constants/ModalConstant"

// oepn and closing th modal
export const modalReducer = (state = {}, { type, payload }) => {
    switch (type) {
        case OPEN_MODAL:
            return { type: payload, bool: true }
        case CLOSE_MODAL:
            return { bool: false }
        default:
            return { bool: false }
    }
}