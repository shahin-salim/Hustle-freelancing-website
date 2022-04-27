import { SET_ACCESS_TOKEN, SET_REFRESH_TOKEN, SET_USER, SET_USER_STATUS } from "../Constants/Token.constance";


// export const accessTokenReducer = (state = "", { type, payload }) => {
//     switch (type) {
//         case SET_ACCESS_TOKEN:
//             return payload
//         default:
//             return state
//     }
// }

// export const refreshTokenReducer = (state = "", { type, payload }) => {
//     switch (type) {
//         case SET_REFRESH_TOKEN:
//             return payload
//         default:
//             return state
//     }
// }

export const setUserStatusReducer = (state = null, { type, payload }) => {
    switch (type) {
        case SET_USER_STATUS:
            return payload
        default:
            return state
    }
}

