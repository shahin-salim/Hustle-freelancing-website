import { combineReducers } from "redux";
import { setUserStatusReducer } from "./tokenReducer"

export const reducer = combineReducers({
    // accessToken: accessTokenReducer,
    // refreshToken: refreshTokenReducer,
    userStatus: setUserStatusReducer,
})