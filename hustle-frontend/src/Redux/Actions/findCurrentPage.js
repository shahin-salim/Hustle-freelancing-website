import { CURRENTLY_ACTIVE_PAGE } from "../Constants/CurrentPage"


// Find which page curr user is in if user is in buyer side all
// the seller router will deactivate
export const currActivatePage = () =>
    async (dispatch, getState) => {
        const state = getState()

        dispatch({
            type: CURRENTLY_ACTIVE_PAGE,
            payload: state.currActivePage == "buyer" ? "seller" : "buyer"
        })
    }