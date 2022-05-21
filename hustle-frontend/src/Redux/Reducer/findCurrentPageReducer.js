import { CURRENTLY_ACTIVE_PAGE } from "../Constants/CurrentPage"

// pages means buyer side or seller
// if  user in buyer side is state value = "buyer"
// if in seller side state value = "seller"
export const findCurrPageReducer = (state = null, { type, payload }) => {
    switch (type) {
        case CURRENTLY_ACTIVE_PAGE:
            return payload
        default:
            return "buyer"
    }
}