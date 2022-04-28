import axios from "axios"
import { SET_USER_STATUS } from "../Constants/Token.constance"
import { LOGOUT_URL, REFRESH_TOKEN_URL } from "../../Utils/Urls"

export const setUserStatus = (status) => async (dispatch, getState) => {
    dispatch({
        type: SET_USER_STATUS,
        payload: status
    })
}


export const logoutTheUser = () => async (dispatch, getState) => {

    try {
        const response = await axios.post(LOGOUT_URL, { refresh: localStorage.getItem("refreshToken") })
        localStorage.removeItem("accessToken")
        localStorage.removeItem("refreshToken")
        console.log(response);
        dispatch({
            type: SET_USER_STATUS,
            payload: false
        })
    } catch (err) {
        console.log(err.response)
    }


}