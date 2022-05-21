import jwt_decode from "jwt-decode"

// put jwt token from the local storage and decode it get the user id from it
// if not token found set state as false
export const decodeJwtToken = () => {
    if (localStorage.getItem('refreshToken')) {
        const token = jwt_decode(localStorage.getItem("accessToken"))
        return {
            "userId": token.user_id,
            "sellerId": token.seller_id
        }
    }
}

