
import { CURRENT_VIEWING_SERVICE } from "../Constants/Services.Contact"


export const setServiceUserReducer = (state = {}, { type, payload }) => {
    switch (type) {
        case CURRENT_VIEWING_SERVICE:
            return { ...payload }
        default:
            return state
    }
}