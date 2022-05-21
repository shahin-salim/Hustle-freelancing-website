import axios from "axios"
import { SET_USER_STATUS } from "../Constants/Token.constance"
import { LOGOUT_URL, REFRESH_TOKEN_URL } from "../../Utils/Urls"
import { decodeJwtToken } from "../../Utils/decode.jwt"

// set user id in the redux user status state 
// in the time of login and register
export const setUserStatus = (refresh, access) =>
    async (dispatch, getState) => {
        console.log("------------------------------------------");
        console.log(refresh, "    ", access);

        localStorage.setItem("refreshToken", refresh)
        localStorage.setItem("accessToken", access)
        console.log("------------------------------------------");

        console.log(decodeJwtToken());

        dispatch({
            type: SET_USER_STATUS,
            payload: decodeJwtToken()
        })
    }


// user logout set redux state userStatus as false 
// remove token from localstorage 
export const logoutTheUser = () => async (dispatch, getState) => {

    try {
        const response = await axios.post(LOGOUT_URL, { refresh: localStorage.getItem("refreshToken") })
        localStorage.removeItem("accessToken")
        localStorage.removeItem("refreshToken")
        dispatch({
            type: SET_USER_STATUS,
            payload: false
        })
    } catch (err) {
        console.log(err.response)
    }

}

