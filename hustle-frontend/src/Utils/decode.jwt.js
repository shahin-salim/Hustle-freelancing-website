import jwt_decode from "jwt-decode"

// put jwt token from the local storage and decode it get the user id from it
// if not token found set state as false
export const decodeJwtToken = () => 
    localStorage.getItem('refreshToken') ? jwt_decode(localStorage.getItem("accessToken")).user_id : false
    