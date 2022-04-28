import { SET_SERVICES } from "../Constants/Services.constants"




export const setServiceReducer = (state = [], { type, payload }) => {
    switch (type) {
        case SET_SERVICES:
            return [...payload]
        default:
            return state
    }
}