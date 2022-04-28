import { SET_USER_STATUS } from "../Constants/Token.constance";


export const setUserStatusReducer = (state = null, { type, payload }) => {
    switch (type) {
        case SET_USER_STATUS:
            return payload
        default:
            return state
    }
}

